import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  Play,
  X,
  Youtube,
} from 'lucide-react'
import { supabase } from './lib/supabase'

/* ---------------------------------- data ---------------------------------- */

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Newsletter', href: '/newsletter' },
  { label: 'Resources', href: '/resources' },
  { label: 'Articles', href: '/articles' },
]

const socials = [
  { label: 'YouTube', href: 'https://youtube.com', icon: Youtube },
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

const articles = [
  {
    slug: 'first-home-lab',
    category: 'Learning log',
    title: 'How I built my first home lab for cybersecurity',
    excerpt: 'A practical way to turn curiosity into a working lab without losing the joy of discovery.',
    date: 'Aug 18, 2026',
    body: [
      'Cybersecurity learning becomes real when the systems stop being abstract. A home lab gives you a place to test, break carefully, and understand what is happening under the hood.',
      'I began with a minimal setup: a router, a few virtual machines, and a way to observe traffic. The goal was not a perfect environment; it was a space where I could learn honestly and repeatedly.',
      'The most useful skill was not memorizing commands but asking better questions. What is the network doing? What happens when a service fails? Why does this log matter? Over time, the lab becomes a teacher.',
    ],
  },
  {
    slug: 'linux-commands',
    category: 'Field notes',
    title: 'The Linux commands I reach for every day',
    excerpt: 'The quiet utility work that keeps a terminal session calm, useful and fast.',
    date: 'Jul 30, 2026',
    body: [
      'The command line is where a lot of learning turns practical. For me, the daily workflow is about visibility: what is running, what is listening, what is changing.',
      'Tools like ls, grep, ss, journalctl and tail become second nature once you use them against real problems. The goal is not to memorize everything — it is to build confidence in how to investigate.',
      'Once I understood the flow of logs, traffic and service health, Linux stopped feeling like a wall of commands and started feeling like a system I could reason about.',
    ],
  },
  {
    slug: 'making-tech-human',
    category: 'Build diary',
    title: 'Making complex technology feel a little more human',
    excerpt: 'Notes on learning in public without losing the joy of figuring things out.',
    date: 'Jun 12, 2026',
    body: [
      'Learning is not a straight line. It is messy, active, and often built from small wins that do not look dramatic from the outside.',
      'I show the process because that is where the real lessons live — the tiny mistakes, the late-night debugging, the tools that almost worked.',
      'Technical work is framed as purely logical, but a lot of it is creative: solving problems, telling a story with systems, building confidence through iteration.',
    ],
  },
]

const projects = [
  {
    slug: 'packet-watch',
    label: 'Lab',
    title: 'Packet Watch',
    description: 'A small network-monitoring dashboard built to understand traffic patterns, quiet spikes, and the signals hiding in plain sight.',
    technology: ['React', 'Node', 'Nginx', 'Linux'],
    status: 'Personal project',
  },
  {
    slug: 'linux-field-kit',
    label: 'Build',
    title: 'Linux Field Kit',
    description: 'A personal toolkit of scripts, notes and repeatable experiments for learning Linux administration through deliberate, practical tasks.',
    technology: ['Bash', 'Python', 'Systemd'],
    status: 'In progress',
  },
]

const updates = [
  { slug: 'cloud-security-learning', tag: 'Building', title: 'Learning cloud security and rebuilding the home lab from the ground up', date: 'Sep 2026' },
  { slug: 'linux-tools-video', tag: 'Content', title: 'A new video on the first tools I reach for on a fresh Linux box', date: 'Jul 2026' },
  { slug: 'ai-security-notes', tag: 'Research', title: 'Collecting questions at the intersection of AI, security and tooling', date: 'Jun 2026' },
  { slug: 'ctf-writeup-habit', tag: 'Learning', title: 'Turning CTF writeups into a weekly habit instead of a one-off', date: 'May 2026' },
]

const resourceGroups = [
  { title: 'Cybersecurity', items: ['A realistic beginner roadmap', 'Threat modeling, in plain language', 'Security fundamentals worth memorizing', 'Home lab ideas that actually teach something'] },
  { title: 'Linux', items: ['Command line basics that stick', 'System monitoring day to day', 'Service management without fear', 'Shell workflows worth stealing'] },
  { title: 'Networking', items: ['TCP/IP, minus the jargon', 'Ports and services cheat sheet', 'Reading traffic like a story', 'Common issues and their tells'] },
  { title: 'Programming', items: ['Python for security work', 'Small automation scripts', 'APIs and tooling notes', 'Debugging as a habit'] },
  { title: 'Tools', items: ['Wireshark', 'Nmap', 'Burp Suite', 'Tailscale', 'Docker'] },
  { title: 'Learning', items: ['A study system that survives busy weeks', 'Reading notes worth keeping', 'Practice loops over passive video', 'Writing as a way of learning'] },
]

/* --------------------------------- helpers --------------------------------- */

function navigateTo(href) {
  if (!href || !href.startsWith('/')) return
  window.history.pushState({}, '', href)
  window.dispatchEvent(new PopStateEvent('popstate'))
  window.scrollTo({ top: 0, behavior: 'auto' })
}

function useDocumentMeta(title, description) {
  useEffect(() => {
    document.title = title
    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector)
      if (!el) {
        el = document.createElement('meta')
        const [, attrName, attrValue] = selector.match(/\[(.+)="(.+)"\]/)
        el.setAttribute(attrName, attrValue)
        document.head.appendChild(el)
      }
      el.setAttribute(attr, value)
    }
    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
  }, [title, description])
}

function Anchor({ href, children, className = '', onClick }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        if (onClick) onClick(event)
        if (href.startsWith('/')) {
          event.preventDefault()
          navigateTo(href)
        }
      }}
    >
      {children}
    </a>
  )
}

function Button({ href, children, variant = 'solid', icon: Icon = ArrowUpRight, external = false }) {
  const cls = variant === 'solid' ? 'btn btn-solid' : 'btn btn-line'
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {children}
        <Icon size={15} />
      </a>
    )
  }
  return (
    <Anchor href={href} className={cls}>
      {children}
      <Icon size={15} />
    </Anchor>
  )
}

function articleFromRow(row) {
  return {
    ...row,
    date: new Date(`${row.published_at}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    body: row.body.split('\n\n').filter(Boolean),
  }
}

const snowflakes = Array.from({ length: 24 }, (_, index) => ({
  left: `${(index * 41) % 100}%`,
  delay: `${(index % 8) * -1.7}s`,
  duration: `${10 + (index % 6) * 2}s`,
  size: `${10 + (index % 4) * 4}px`,
  drift: `${(index % 2 ? 1 : -1) * (18 + (index % 5) * 12)}px`,
}))

function Snowfall() {
  return (
    <div className="snowfall" aria-hidden="true">
      {snowflakes.map((flake, index) => (
        <span
          key={index}
          className="snowflake"
          style={{
            left: flake.left,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
            fontSize: flake.size,
            '--snow-drift': flake.drift,
          }}
        >
          ❄
        </span>
      ))}
    </div>
  )
}

/* --------------------------------- header --------------------------------- */

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-12">
      <Anchor href="/" className="font-display text-lg font-semibold tracking-tight text-paper">
        Vinks Goyal
      </Anchor>

      <nav className="hidden items-center gap-8 rounded-full border border-paper/15 bg-ink/40 px-6 py-2.5 backdrop-blur-md md:flex">
        {navItems.map((item) => (
          <Anchor key={item.href} href={item.href} className="link-underline font-copy text-sm text-paper/80 hover:text-paper">
            {item.label}
          </Anchor>
        ))}
      </nav>

      <button
        className="grid h-10 w-10 place-items-center rounded-full border border-paper/20 bg-ink/40 text-paper backdrop-blur-md md:hidden"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div className="absolute inset-x-4 top-[4.5rem] flex flex-col gap-1 rounded-3xl border border-paper/15 bg-ink/95 p-4 backdrop-blur-md md:hidden">
          {navItems.map((item) => (
            <Anchor
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 font-copy text-base text-paper/85 hover:bg-paper/5 hover:text-paper"
            >
              {item.label}
            </Anchor>
          ))}
        </div>
      )}
    </header>
  )
}

/* --------------------------------- footer --------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-panel grid-cols-2 gap-10 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <p className="font-display text-lg font-semibold text-paper">Vinks Goyal</p>
          <p className="mt-3 max-w-[22ch] font-copy text-sm text-paper/55">
            Learning cybersecurity in public, one build at a time.
          </p>
        </div>
        <div>
          <p className="font-mono text-xs text-paper/40">Site</p>
          <ul className="mt-3 space-y-2 font-copy text-sm text-paper/70">
            <li><Anchor href="/" className="link-underline">Home</Anchor></li>
            <li><Anchor href="/about" className="link-underline">About</Anchor></li>
            <li><Anchor href="/contact" className="link-underline">Contact us</Anchor></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs text-paper/40">Content</p>
          <ul className="mt-3 space-y-2 font-copy text-sm text-paper/70">
            <li><Anchor href="/articles" className="link-underline">Articles</Anchor></li>
            <li><Anchor href="/resources" className="link-underline">Resources</Anchor></li>
            <li><Anchor href="/news" className="link-underline">News &amp; updates</Anchor></li>
            <li><Anchor href="/newsletter" className="link-underline">Newsletter</Anchor></li>
            <li><Anchor href="/projects" className="link-underline">Projects</Anchor></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-xs text-paper/40">Elsewhere</p>
          <ul className="mt-3 space-y-2 font-copy text-sm text-paper/70">
            {socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" className="link-underline inline-flex items-center gap-2">
                  <s.icon size={14} /> {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-14 flex max-w-panel flex-col gap-3 border-t border-paper/10 pt-6 text-xs text-paper/40 sm:flex-row sm:items-center sm:justify-between">
        <span>&copy; {new Date().getFullYear()} Vinks Goyal. All rights reserved.</span>
        <div className="flex gap-5">
          <Anchor href="/privacy" className="link-underline">Privacy policy</Anchor>
          <Anchor href="/terms" className="link-underline">Terms &amp; conditions</Anchor>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------- scene section ------------------------------ */

function Scene({ image, children, className = '', minH = 'min-h-[92vh]', overlay = false }) {
  const sceneRef = useRef(null)
  const backgroundRef = useRef(null)

  useEffect(() => {
    const scene = sceneRef.current
    const background = backgroundRef.current
    const desktop = window.matchMedia('(min-width: 768px)')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!scene || !background || desktop.matches || reduceMotion.matches) return undefined

    let frameId
    const updateBackground = () => {
      frameId = undefined
      const { top } = scene.getBoundingClientRect()
      background.style.transform = `translate3d(0, ${top * -0.2}px, 0)`
    }
    const onScroll = () => {
      if (frameId === undefined) frameId = window.requestAnimationFrame(updateBackground)
    }

    updateBackground()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frameId !== undefined) window.cancelAnimationFrame(frameId)
    }
  }, [])

  return (
    <section
      ref={sceneRef}
      className={`scene scene-fixed relative flex ${minH} w-full ${className}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div
        ref={backgroundRef}
        className="scene-mobile-bg"
        style={{ backgroundImage: `url(${image})` }}
        aria-hidden="true"
      />
      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />}
      <div className="relative z-[1] flex w-full">{children}</div>
    </section>
  )
}

/* ---------------------------------- home ---------------------------------- */

function Hero() {
  return (
    <Scene image="/scene1.jpg" minH="min-h-screen" className="items-start">
      <div className="w-full px-6 pt-32 md:px-12 md:pt-40">
        <div className="max-w-lg">
          <p className="hero-enter font-mono text-xs text-paper/60">Cybersecurity creator &amp; lifelong learner</p>
          <h1 className="hero-enter hero-enter-delay-1 mt-4 font-display text-4xl font-bold leading-[1.05] text-paper sm:text-5xl">
            Hi, I&apos;m Vinks.
          </h1>
          <p className="hero-enter hero-enter-delay-1 mt-2 font-display text-2xl font-medium leading-tight text-paper/90 sm:text-3xl">
            Your journey into cybersecurity starts here.
          </p>
          <p className="hero-enter hero-enter-delay-2 mt-5 max-w-sm font-copy text-base leading-relaxed text-paper/65">
            I&apos;m building a career in security one experiment at a time — home labs, Linux, CTFs,
            and the occasional 2am debugging session — and writing down everything I learn along the way.
          </p>
          <div className="hero-enter hero-enter-delay-2 mt-8 flex flex-wrap gap-3">
            <Button href="/about">Start my cybersecurity journey</Button>
            <Button href="https://youtube.com" external variant="line" icon={Play}>Watch on YouTube</Button>
          </div>
        </div>
      </div>
    </Scene>
  )
}

function WhatIDo() {
  const rows = [
    { title: 'Cybersecurity', copy: 'Home labs, CTFs and the fundamentals that hold up under pressure.' },
    { title: 'Learning', copy: 'A study system built for consistency, not motivation.' },
    { title: 'Building', copy: 'Small tools that make the invisible parts of a network visible.' },
    { title: 'Creating', copy: 'Writing and video that turn confusion into something teachable.' },
  ]
  return (
    <Scene image="/scene2.jpg" className="items-start justify-end">
      <div className="w-full px-6 pb-16 pt-28 md:px-12 md:pb-20 md:pt-32">
        <div className="ml-auto max-w-md text-right">
          <p className="font-mono text-xs text-paper/60">What I do</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
            Four habits, one direction.
          </h2>
          <div className="mt-8 space-y-5">
            {rows.map((row) => (
              <div key={row.title} className="border-b border-paper/15 pb-5 last:border-none">
                <h3 className="font-display text-lg font-semibold text-paper">{row.title}</h3>
                <p className="mt-1 font-copy text-sm text-paper/60">{row.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Scene>
  )
}

function ArticleRow({ article }) {
  return (
    <Anchor href={`/articles/${article.slug}`} className="group block border-b border-paper/10 py-6 first:pt-0 last:border-none">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p className="font-mono text-xs text-amber">{article.category} &middot; {article.date}</p>
          <h3 className="mt-1.5 font-display text-xl font-semibold text-paper group-hover:text-amber">{article.title}</h3>
          <p className="mt-1.5 max-w-lg font-copy text-sm text-paper/60">{article.excerpt}</p>
        </div>
        <span className="flex shrink-0 items-center gap-2 font-mono text-xs text-paper/70 group-hover:text-amber">
          Read article <ArrowUpRight size={14} />
        </span>
      </div>
    </Anchor>
  )
}

function ArticlesHome({ items }) {
  return (
    <Scene image="/scene3.jpg" className="items-start">
      <div className="w-full px-6 pt-24 md:px-12 md:pt-28">
        <div className="max-w-md">
          <p className="font-mono text-xs text-paper/60">Writing</p>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">Things I&apos;ve written.</h2>
          <p className="mt-3 font-copy text-sm text-paper/65">
            Notes, tutorials and honest thoughts from the middle of learning — not after I&apos;ve figured it all out.
          </p>
        </div>

        <div className="mt-10 rounded-3xl bg-ink/85 p-6 backdrop-blur-sm md:p-8">
          {items.map((a) => <ArticleRow key={a.slug} article={a} />)}
          <div className="pt-6">
            <Button href="/articles" variant="line">View all articles</Button>
          </div>
        </div>
      </div>
    </Scene>
  )
}

function ProjectsHome() {
  return (
    <Scene image="/scene4.jpg" className="items-start">
      <div className="w-full px-6 pt-24 md:px-12 md:pt-28">
        <p className="font-mono text-xs text-paper/60">Projects</p>
        <h2 className="mt-3 max-w-md font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
          Things I do in my free time.
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {projects.map((p) => (
            <Anchor
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group flex flex-col justify-between rounded-3xl bg-ink/85 p-7 backdrop-blur-sm"
            >
              <div>
                <p className="font-mono text-xs text-amber">{p.label}</p>
                <h3 className="mt-2 font-display text-xl font-semibold text-paper group-hover:text-amber">{p.title}</h3>
                <p className="mt-2 font-copy text-sm text-paper/60">{p.description}</p>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <ul className="flex flex-wrap gap-2 font-mono text-[11px] text-paper/50">
                  {p.technology.map((t) => <li key={t} className="rounded-full border border-paper/15 px-2.5 py-1">{t}</li>)}
                </ul>
                <ArrowUpRight size={16} className="shrink-0 text-paper/60 group-hover:text-amber" />
              </div>
            </Anchor>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/projects" variant="line">View all projects</Button>
        </div>
      </div>
    </Scene>
  )
}

function NewsHome() {
  return (
    <Scene image="/scene5.jpg" className="items-center">
      <div className="mx-auto w-full max-w-lg px-6 py-24 text-center md:px-12">
        <p className="font-mono text-xs text-paper/60">News &amp; updates</p>
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">
          What&apos;s happening in the lab.
        </h2>
        <div className="mt-10 space-y-4 text-left">
          {updates.slice(0, 3).map((u) => (
            <Anchor key={u.slug} href={`/news/${u.slug}`} className="group flex items-center justify-between gap-4 rounded-2xl bg-ink/70 px-5 py-4 backdrop-blur-sm">
              <span className="min-w-0">
                <span className="block font-mono text-[11px] text-amber">{u.tag} &middot; {u.date}</span>
                <span className="mt-1 block truncate font-copy text-sm text-paper/85">{u.title}</span>
              </span>
              <ArrowUpRight size={16} className="shrink-0 text-paper/50 group-hover:text-amber" />
            </Anchor>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Button href="/news" variant="line">View all updates</Button>
        </div>
      </div>
    </Scene>
  )
}

function NewsletterHome() {
  const [message, setMessage] = useState('')

  async function subscribe(event) {
    event.preventDefault()
    const email = event.currentTarget.elements.email.value.trim()
    if (!supabase) return setMessage('Newsletter is not configured yet.')
    const { error } = await supabase.from('newsletter_subscribers').insert({ email })
    setMessage(error?.code === '23505' ? 'You are already subscribed.' : error ? error.message : 'You are on the list.')
    if (!error) event.currentTarget.reset()
  }

  return (
    <section className="bg-ink px-6 py-24 md:px-12">
      <div className="mx-auto max-w-lg text-center">
        <h2 className="font-display text-3xl font-bold text-paper sm:text-4xl">Get updates from my journey.</h2>
        <p className="mt-3 font-copy text-sm text-paper/60">
          One email, roughly twice a month — what I&apos;m learning, building and reading about security.
        </p>
        <form
          className="mt-8 flex flex-col gap-3 sm:flex-row"
          onSubmit={subscribe}
        >
          <input
            type="email"
            required
            placeholder="Enter your email..."
            className="w-full rounded-full border border-paper/20 bg-transparent px-5 py-3 font-copy text-sm text-paper placeholder:text-paper/40 focus:border-amber focus:outline-none"
          />
          <button type="submit" className="btn btn-solid justify-center">Subscribe</button>
        </form>
        {message && <p className="mt-3 font-copy text-xs text-amber">{message}</p>}
      </div>
    </section>
  )
}

function HomePage({ items }) {
  useDocumentMeta(
    'Vinks Goyal — Cybersecurity creator, learner, builder',
    'Vinks Goyal writes, builds and learns in public about cybersecurity, Linux and the systems underneath modern technology.',
  )
  return (
    <>
      <Hero />
      <WhatIDo />
      <ArticlesHome items={items} />
      <ProjectsHome />
      <NewsHome />
      <NewsletterHome />
    </>
  )
}

/* ------------------------------- inner pages -------------------------------- */

function PageHeader({ eyebrow, title, intro }) {
  return (
    <div className="mx-auto max-w-panel px-6 pb-10 pt-36 md:px-12 md:pt-44">
      <p className="font-mono text-xs text-paper/50">{eyebrow}</p>
      <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold leading-[1.05] text-paper sm:text-5xl">{title}</h1>
      {intro && <p className="mt-4 max-w-lg font-copy text-base text-paper/60">{intro}</p>}
    </div>
  )
}

function AboutPage({ about }) {
  useDocumentMeta('About | Vinks Goyal', 'Who Vinks Goyal is and how his cybersecurity journey started.')
  return (
    <main className="bg-ink">
      <PageHeader eyebrow="About" title="Still figuring it out — just doing it publicly." />
      <div className="mx-auto grid max-w-panel gap-10 px-6 pb-24 md:grid-cols-[1.2fr_1fr] md:px-12">
        <div className="space-y-5 font-copy text-base leading-relaxed text-paper/70">
          {about.split('\n\n').filter(Boolean).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="overflow-hidden rounded-3xl">
          <img src="/vinks.jpg" alt="Portrait of Vinks Goyal" className="h-full w-full object-cover" />
        </div>
      </div>
    </main>
  )
}

function ContactPage() {
  useDocumentMeta('Contact | Vinks Goyal', 'Get in touch with Vinks Goyal.')
  return (
    <main className="bg-ink">
      <PageHeader eyebrow="Contact" title="Say hello." intro="Questions, collaboration ideas, or just something interesting you found — I read everything that comes in." />
      <div className="mx-auto max-w-panel px-6 pb-24 md:px-12">
        <div className="grid gap-10 md:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="font-mono text-xs text-paper/50">Reach me directly</p>
            <a href="mailto:divyanshgoyal1@outlook.com" className="link-underline mt-2 inline-flex items-center gap-2 font-copy text-lg text-paper">
              <Mail size={18} /> divyanshgoyal1@outlook.com
            </a>
            <div className="mt-10 flex gap-4">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-full border border-paper/15 text-paper/70 hover:border-amber hover:text-amber">
                  <s.icon size={17} />
                </a>
              ))}
            </div>
          </div>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name" className="font-mono text-xs text-paper/50">Name</label>
              <input id="name" required className="mt-2 w-full rounded-xl border border-paper/20 bg-transparent px-4 py-3 font-copy text-sm text-paper focus:border-amber focus:outline-none" />
            </div>
            <div>
              <label htmlFor="email" className="font-mono text-xs text-paper/50">Email</label>
              <input id="email" type="email" required className="mt-2 w-full rounded-xl border border-paper/20 bg-transparent px-4 py-3 font-copy text-sm text-paper focus:border-amber focus:outline-none" />
            </div>
            <div>
              <label htmlFor="message" className="font-mono text-xs text-paper/50">Message</label>
              <textarea id="message" rows={5} required className="mt-2 w-full rounded-xl border border-paper/20 bg-transparent px-4 py-3 font-copy text-sm text-paper focus:border-amber focus:outline-none" />
            </div>
            <button type="submit" className="btn btn-solid">Send message</button>
          </form>
        </div>
      </div>
    </main>
  )
}

function NewsletterPage() {
  const [message, setMessage] = useState('')

  async function subscribe(event) {
    event.preventDefault()
    const email = event.currentTarget.elements.email.value.trim()
    if (!supabase) return setMessage('Newsletter is not configured yet.')
    const { error } = await supabase.from('newsletter_subscribers').insert({ email })
    setMessage(error?.code === '23505' ? 'You are already subscribed.' : error ? error.message : 'You are on the list.')
    if (!error) event.currentTarget.reset()
  }

  useDocumentMeta('Newsletter | Vinks Goyal', 'Subscribe to updates from Vinks Goyal\u2019s cybersecurity journey.')
  return (
    <main className="bg-ink">
      <PageHeader eyebrow="Newsletter" title="Get updates from my journey." intro="What I'm learning, building and reading — sent roughly twice a month, no fluff." />
      <div className="mx-auto max-w-md px-6 pb-24 md:px-12">
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={subscribe}>
          <input type="email" required placeholder="Enter your email..." className="w-full rounded-full border border-paper/20 bg-transparent px-5 py-3 font-copy text-sm text-paper placeholder:text-paper/40 focus:border-amber focus:outline-none" />
          <button type="submit" className="btn btn-solid justify-center">Subscribe</button>
        </form>
        {message && <p className="mt-3 font-copy text-xs text-amber">{message}</p>}
        <p className="mt-4 font-copy text-xs text-paper/40">No spam. Unsubscribe anytime.</p>
      </div>
    </main>
  )
}

function ResourcesPage() {
  useDocumentMeta('Resources | Vinks Goyal', 'A knowledge hub of cybersecurity, Linux and networking resources.')
  return (
    <main className="bg-ink">
      <PageHeader eyebrow="Resources" title="The knowledge hub." intro="Everything I keep coming back to, organized so you don't have to dig for it." />
      <div className="mx-auto grid max-w-panel gap-x-10 gap-y-12 px-6 pb-24 sm:grid-cols-2 md:px-12 lg:grid-cols-3">
        {resourceGroups.map((group) => (
          <div key={group.title}>
            <h2 className="font-display text-lg font-semibold text-paper">{group.title}</h2>
            <ul className="mt-4 space-y-2.5 font-copy text-sm text-paper/65">
              {group.items.map((item) => (
                <li key={item} className="border-b border-paper/10 pb-2.5">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  )
}

function ArticlesPage({ items }) {
  useDocumentMeta('Articles | Vinks Goyal', 'All writing from Vinks Goyal on cybersecurity, Linux and learning in public.')
  return (
    <main className="bg-ink">
      <PageHeader eyebrow="Articles" title="Things I've written." />
      <div className="mx-auto max-w-panel px-6 pb-24 md:px-12">
        {items.map((a) => <ArticleRow key={a.slug} article={a} />)}
      </div>
    </main>
  )
}

function ArticleDetailPage({ article }) {
  useDocumentMeta(`${article.title} | Vinks Goyal`, article.excerpt)
  return (
    <main className="bg-ink">
      <article className="mx-auto max-w-2xl px-6 pb-24 pt-36 md:px-12 md:pt-44">
        <p className="font-mono text-xs text-amber">{article.category} &middot; {article.date}</p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">{article.title}</h1>
        <div className="mt-8 space-y-5 font-copy text-base leading-relaxed text-paper/75">
          {article.body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="mt-12">
          <Button href="/articles" variant="line">Back to all articles</Button>
        </div>
      </article>
    </main>
  )
}

function ProjectsPage() {
  useDocumentMeta('Projects | Vinks Goyal', 'Personal cybersecurity and Linux projects by Vinks Goyal.')
  return (
    <main className="bg-ink">
      <PageHeader eyebrow="Projects" title="Things I do in my free time." />
      <div className="mx-auto grid max-w-panel gap-5 px-6 pb-24 sm:grid-cols-2 md:px-12">
        {projects.map((p) => (
          <Anchor key={p.slug} href={`/projects/${p.slug}`} className="group flex flex-col justify-between rounded-3xl border border-paper/10 p-7">
            <div>
              <p className="font-mono text-xs text-amber">{p.label}</p>
              <h2 className="mt-2 font-display text-xl font-semibold text-paper group-hover:text-amber">{p.title}</h2>
              <p className="mt-2 font-copy text-sm text-paper/60">{p.description}</p>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <ul className="flex flex-wrap gap-2 font-mono text-[11px] text-paper/50">
                {p.technology.map((t) => <li key={t} className="rounded-full border border-paper/15 px-2.5 py-1">{t}</li>)}
              </ul>
              <ArrowUpRight size={16} className="shrink-0 text-paper/60 group-hover:text-amber" />
            </div>
          </Anchor>
        ))}
      </div>
    </main>
  )
}

function ProjectDetailPage({ project }) {
  useDocumentMeta(`${project.title} | Vinks Goyal`, project.description)
  return (
    <main className="bg-ink">
      <article className="mx-auto max-w-2xl px-6 pb-24 pt-36 md:px-12 md:pt-44">
        <p className="font-mono text-xs text-amber">{project.label} &middot; {project.status}</p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">{project.title}</h1>
        <p className="mt-5 font-copy text-base leading-relaxed text-paper/75">{project.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2 font-mono text-xs text-paper/60">
          {project.technology.map((t) => <li key={t} className="rounded-full border border-paper/15 px-3 py-1.5">{t}</li>)}
        </ul>
        <div className="mt-12">
          <Button href="/projects" variant="line">Back to all projects</Button>
        </div>
      </article>
    </main>
  )
}

function NewsPage() {
  useDocumentMeta('News | Vinks Goyal', 'Personal updates and tech notes from Vinks Goyal.')
  return (
    <main className="bg-ink">
      <PageHeader eyebrow="News" title="What's happening in the lab." />
      <div className="mx-auto max-w-panel px-6 pb-24 md:px-12">
        {updates.map((u) => (
          <Anchor key={u.slug} href={`/news/${u.slug}`} className="group flex items-center justify-between gap-4 border-b border-paper/10 py-5 first:pt-0 last:border-none">
            <span className="min-w-0">
              <span className="font-mono text-xs text-amber">{u.tag} &middot; {u.date}</span>
              <span className="mt-1 block font-display text-lg font-medium text-paper group-hover:text-amber">{u.title}</span>
            </span>
            <ArrowUpRight size={16} className="shrink-0 text-paper/50 group-hover:text-amber" />
          </Anchor>
        ))}
      </div>
    </main>
  )
}

function NewsDetailPage({ update }) {
  useDocumentMeta(`${update.title} | Vinks Goyal`, 'A recent update from Vinks Goyal\u2019s ongoing learning and building journey.')
  return (
    <main className="bg-ink">
      <article className="mx-auto max-w-2xl px-6 pb-24 pt-36 md:px-12 md:pt-44">
        <p className="font-mono text-xs text-amber">{update.tag} &middot; {update.date}</p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-paper sm:text-4xl">{update.title}</h1>
        <div className="mt-8 space-y-5 font-copy text-base leading-relaxed text-paper/75">
          <p>I&apos;m currently focused on the practical side of learning: building more useful systems, understanding how real infrastructure behaves, and turning that into honest notes other curious people can use.</p>
          <p>The aim is simple — keep learning with intention, keep showing the process, and keep building a better understanding of the tools that shape modern digital life.</p>
        </div>
        <div className="mt-12">
          <Button href="/news" variant="line">Back to all updates</Button>
        </div>
      </article>
    </main>
  )
}

function LegalPage({ mode }) {
  const isTerms = mode === 'terms'
  useDocumentMeta(
    isTerms ? 'Terms & Conditions | Vinks Goyal' : 'Privacy Policy | Vinks Goyal',
    isTerms ? 'Terms and conditions for the Vinks Goyal website.' : 'How Vinks Goyal handles personal information.',
  )
  return (
    <main className="bg-ink">
      <PageHeader eyebrow={isTerms ? 'Legal · Terms' : 'Legal · Privacy'} title={isTerms ? 'Terms & conditions.' : 'Privacy policy.'} />
      <div className="mx-auto max-w-2xl space-y-6 px-6 pb-24 font-copy text-base leading-relaxed text-paper/70 md:px-12">
        {isTerms ? (
          <>
            <p>This website is a personal portfolio and learning space. You&apos;re welcome to read, share and link to its content for personal and educational use. Please don&apos;t copy or republish original writing, artwork or code without permission.</p>
            <p>Content here reflects my own learning and opinions at the time of writing. It is not professional security advice — always verify anything sensitive against current, authoritative sources.</p>
          </>
        ) : (
          <>
            <p>This site collects only what you choose to share — your email if you subscribe to the newsletter, or your message if you use the contact form. It&apos;s used only to respond, send updates, or improve the site.</p>
            <p>I don&apos;t sell or share your information with third parties.</p>
          </>
        )}
        <p>Questions about either policy? Reach me at <a href="mailto:divyanshgoyal1@outlook.com" className="link-underline">divyanshgoyal1@outlook.com</a>.</p>
      </div>
    </main>
  )
}

function NotFoundPage() {
  useDocumentMeta('Not found | Vinks Goyal', 'The page you were looking for could not be found.')
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-6 text-center">
      <p className="font-mono text-xs text-paper/50">404</p>
      <h1 className="mt-3 font-display text-3xl font-bold text-paper sm:text-4xl">This page isn&apos;t in the signal.</h1>
      <p className="mt-3 max-w-sm font-copy text-sm text-paper/60">The route you requested is missing or has moved.</p>
      <div className="mt-8"><Button href="/">Back home</Button></div>
    </main>
  )
}

function AdminPage() {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [about, setAbout] = useState('')
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!supabase) return undefined
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => data.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session || !supabase) return
    Promise.all([
      supabase.from('about_content').select('content').limit(1).single(),
      supabase.from('articles').select('*').order('published_at', { ascending: false }),
    ]).then(([aboutResult, articlesResult]) => {
      if (aboutResult.data) setAbout(aboutResult.data.content)
      if (articlesResult.data) setItems(articlesResult.data.map(articleFromRow))
    })
  }, [session])

  async function login(event) {
    event.preventDefault()
    setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
  }

  async function saveAbout(event) {
    event.preventDefault()
    const { error } = await supabase.from('about_content').upsert({ id: 1, content: about, updated_at: new Date().toISOString() })
    setMessage(error ? error.message : 'About section saved.')
  }

  async function saveArticle(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const payload = {
      slug: form.get('slug').trim(),
      category: form.get('category').trim(),
      title: form.get('title').trim(),
      excerpt: form.get('excerpt').trim(),
      body: form.get('body').trim(),
      published_at: form.get('published_at'),
      published: form.get('published') === 'on',
    }
    const query = editing
      ? supabase.from('articles').update(payload).eq('id', editing.id)
      : supabase.from('articles').insert(payload)
    const { error } = await query
    if (error) return setMessage(error.message)
    const { data } = await supabase.from('articles').select('*').order('published_at', { ascending: false })
    setItems(data.map(articleFromRow))
    setEditing(null)
    event.currentTarget.reset()
    setMessage('Article saved.')
  }

  async function deleteArticle(id) {
    if (!window.confirm('Delete this article?')) return
    const { error } = await supabase.from('articles').delete().eq('id', id)
    if (error) return setMessage(error.message)
    setItems((current) => current.filter((item) => item.id !== id))
    setMessage('Article deleted.')
  }

  if (!supabase) {
    return <main className="min-h-screen bg-ink px-6 pb-24 pt-36"><PageHeader eyebrow="Admin" title="Supabase is not configured." intro="Copy .env.example to .env.local and add your Supabase URL and anon key." /></main>
  }

  if (!session) {
    return (
      <main className="min-h-screen bg-ink px-6 pb-24 pt-36">
        <div className="mx-auto max-w-md">
          <p className="font-mono text-xs text-paper/50">Admin</p>
          <h1 className="mt-3 font-display text-4xl font-bold text-paper">Sign in.</h1>
          <form className="mt-8 space-y-4" onSubmit={login}>
            <input type="email" required placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-paper/20 bg-transparent px-4 py-3 text-paper" />
            <input type="password" required placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-paper/20 bg-transparent px-4 py-3 text-paper" />
            <button className="btn btn-solid" type="submit">Sign in</button>
            {message && <p className="text-sm text-amber">{message}</p>}
          </form>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-ink px-6 pb-24 pt-32 md:px-12">
      <div className="mx-auto max-w-panel">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="font-mono text-xs text-paper/50">Admin</p><h1 className="mt-2 font-display text-4xl font-bold text-paper">Content desk.</h1></div>
          <button className="btn btn-line" onClick={() => supabase.auth.signOut()}>Sign out</button>
        </div>
        <section className="mt-10 border-t border-paper/10 pt-8">
          <h2 className="font-display text-2xl font-semibold text-paper">About</h2>
          <form className="mt-4" onSubmit={saveAbout}>
            <textarea value={about} onChange={(event) => setAbout(event.target.value)} rows={7} className="w-full rounded-xl border border-paper/20 bg-transparent p-4 text-paper" />
            <button className="btn btn-solid mt-3" type="submit">Save About</button>
          </form>
        </section>
        <section className="mt-12 border-t border-paper/10 pt-8">
          <div className="flex items-center justify-between gap-4"><h2 className="font-display text-2xl font-semibold text-paper">Articles</h2><button className="btn btn-line" onClick={() => setEditing({})}>New article</button></div>
          {editing && <form className="mt-6 grid gap-3 rounded-2xl border border-paper/10 p-5 md:grid-cols-2" onSubmit={saveArticle}>
            <input name="title" required defaultValue={editing.title} placeholder="Title" className="input-admin" />
            <input name="slug" required defaultValue={editing.slug} placeholder="Slug" className="input-admin" />
            <input name="category" required defaultValue={editing.category || 'Learning log'} placeholder="Category" className="input-admin" />
            <input name="published_at" required type="date" defaultValue={editing.published_at || new Date().toISOString().slice(0, 10)} className="input-admin" />
            <input name="excerpt" required defaultValue={editing.excerpt} placeholder="Excerpt" className="input-admin md:col-span-2" />
            <textarea name="body" required defaultValue={editing.body?.join('\n\n') || ''} placeholder="Body paragraphs separated by a blank line" rows={8} className="input-admin md:col-span-2" />
            <label className="flex items-center gap-2 text-sm text-paper/70 md:col-span-2"><input name="published" type="checkbox" defaultChecked={editing.published} /> Published</label>
            <div className="flex gap-3"><button className="btn btn-solid" type="submit">Save article</button><button className="btn btn-line" type="button" onClick={() => setEditing(null)}>Cancel</button></div>
          </form>}
          <div className="mt-6 space-y-3">{items.map((item) => <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-paper/10 py-4"><div><p className="font-mono text-xs text-amber">{item.published ? 'Published' : 'Draft'}</p><h3 className="font-display text-lg text-paper">{item.title}</h3></div><div className="flex gap-2"><button className="btn btn-line" onClick={() => setEditing(item)}>Edit</button><button className="btn btn-line" onClick={() => deleteArticle(item.id)}>Delete</button></div></div>)}</div>
        </section>
        {message && <p className="mt-6 text-sm text-amber">{message}</p>}
      </div>
    </main>
  )
}

/* ----------------------------------- app ----------------------------------- */

export default function App() {
  const [path, setPath] = useState(() => window.location.pathname)
  const [remoteArticles, setRemoteArticles] = useState(null)
  const [about, setAbout] = useState("I'm Vinks — a cybersecurity learner, builder and writer. I didn't start with a computer science degree or a security clearance; I started with curiosity about why systems break, and a habit of taking notes while I found out.\n\nMy learning philosophy is simple: build the thing, break the thing, write down what happened.")

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  useEffect(() => {
    if (!supabase) return
    supabase.from('articles').select('*').eq('published', true).order('published_at', { ascending: false }).then(({ data }) => {
      if (data?.length) setRemoteArticles(data.map(articleFromRow))
    })
    supabase.from('about_content').select('content').limit(1).single().then(({ data }) => {
      if (data?.content) setAbout(data.content)
    })
  }, [])

  const siteArticles = remoteArticles || articles

  const page = useMemo(() => {
    if (path === '/admin') return <AdminPage />
    if (path === '/') return <HomePage items={siteArticles} />
    if (path === '/about') return <AboutPage about={about} />
    if (path === '/contact') return <ContactPage />
    if (path === '/newsletter') return <NewsletterPage />
    if (path === '/resources') return <ResourcesPage />
    if (path === '/articles') return <ArticlesPage items={siteArticles} />
    if (path === '/projects') return <ProjectsPage />
    if (path === '/news') return <NewsPage />
    if (path === '/privacy') return <LegalPage mode="privacy" />
    if (path === '/terms') return <LegalPage mode="terms" />

    if (path.startsWith('/articles/')) {
      const match = siteArticles.find((a) => a.slug === path.replace('/articles/', ''))
      return match ? <ArticleDetailPage article={match} /> : <NotFoundPage />
    }
    if (path.startsWith('/projects/')) {
      const match = projects.find((p) => p.slug === path.replace('/projects/', ''))
      return match ? <ProjectDetailPage project={match} /> : <NotFoundPage />
    }
    if (path.startsWith('/news/')) {
      const match = updates.find((u) => u.slug === path.replace('/news/', ''))
      return match ? <NewsDetailPage update={match} /> : <NotFoundPage />
    }
    return <NotFoundPage />
  }, [about, path, siteArticles])

  return (
    <div className="min-h-screen bg-ink font-copy text-paper">
      <Snowfall />
      <Header />
      {page}
      <Footer />
    </div>
  )
}
