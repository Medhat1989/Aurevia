import React, { useState, useEffect } from 'react';
import { INITIAL_JOURNAL_ARTICLES, JournalArticle } from '../data/aureviaData';
import { BookOpen, Sparkles, X, PlusCircle, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react';

interface JournalSectionProps {
  onOpenArticle?: (article: JournalArticle) => void;
}

export const JournalSection: React.FC<JournalSectionProps> = () => {
  const [articles, setArticles] = useState<JournalArticle[]>(() => {
    try {
      const saved = localStorage.getItem('aurevia_journal_articles');
      return saved ? JSON.parse(saved) : INITIAL_JOURNAL_ARTICLES;
    } catch {
      return INITIAL_JOURNAL_ARTICLES;
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [partnerForm, setPartnerForm] = useState({
    name: '',
    brand: '',
    email: '',
    format: 'Sponsored Feature (Editorial & Photography)',
    message: ''
  });

  // CMS modal state
  const [cmsOpen, setCmsOpen] = useState(false);
  const [cmsForm, setCmsForm] = useState({
    title: '',
    category: 'Aviation' as JournalArticle['category'],
    author: '',
    readTime: '4 min read',
    excerpt: '',
    contentParagraphs: ''
  });

  useEffect(() => {
    try {
      localStorage.setItem('aurevia_journal_articles', JSON.stringify(articles));
    } catch {
      // ignore
    }
  }, [articles]);

  const categories = ['All', 'Aviation', 'Travel', 'Lifestyle', 'Partner Feature'];

  const filteredArticles = activeCategory === 'All'
    ? articles
    : articles.filter((a) => a.category === activeCategory);

  const handlePublishArticle = (e: React.FormEvent) => {
    e.preventDefault();
    const newArticle: JournalArticle = {
      id: `custom-${Date.now()}`,
      title: cmsForm.title,
      category: cmsForm.category,
      author: cmsForm.author || 'Aurevia Editorial Board',
      readTime: cmsForm.readTime || '5 min read',
      date: 'Current Issue',
      excerpt: cmsForm.excerpt,
      content: cmsForm.contentParagraphs.split('\n\n').filter(Boolean),
      featuredImage: INITIAL_JOURNAL_ARTICLES[0].featuredImage
    };

    setArticles([newArticle, ...articles]);
    setCmsOpen(false);
    setCmsForm({
      title: '',
      category: 'Aviation',
      author: '',
      readTime: '4 min read',
      excerpt: '',
      contentParagraphs: ''
    });
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerSubmitted(true);
  };

  return (
    <section id="journal" className="py-24 bg-[#12141C] relative border-b border-[#1E2436]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-xs tracking-[0.25em] text-[#D8B683] uppercase font-medium mb-3">
              <span className="w-8 h-[1px] bg-[#B68A4E]/60 inline-block" />
              <span>Monthly Publication</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#F3F0E7] font-normal tracking-tight">
              The Journal.
            </h2>
            <p className="text-sm sm:text-base text-[#F3F0E7]/70 mt-3 font-light leading-relaxed">
              Essays on aeronautical design, sovereign itineraries, horology, and the quiet philosophy of travel.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* CMS / Publishing Desk Trigger */}
            <button
              onClick={() => setCmsOpen(true)}
              className="px-4 py-2 btn-glass-liquid text-[#F3F0E7] text-xs font-medium rounded-lg inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#D8B683]" />
              <span>Editorial Desk (CMS)</span>
            </button>

            {/* Partner / Advertise Trigger */}
            <button
              onClick={() => {
                setPartnerModalOpen(true);
                setPartnerSubmitted(false);
              }}
              className="px-5 py-2 btn-glass-liquid-brass text-xs uppercase tracking-wider font-medium rounded-lg cursor-pointer inline-flex items-center gap-1.5 shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Partner / Advertise</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-medium transition-all rounded-lg cursor-pointer ${
                activeCategory === cat
                  ? 'btn-glass-liquid-brass text-[#F3F0E7] shadow-md'
                  : 'btn-glass-liquid text-[#F3F0E7]/70 hover:text-[#F3F0E7]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden rounded-lg bg-[#0A0A0A] mb-4">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-transparent opacity-60" />
                </div>

                {/* Zero-Pill Metadata Rule: Unboxed text with subtle typographic separators */}
                <div className="flex items-center gap-2 text-[11px] text-[#D8B683] mb-2 font-medium">
                  <span>{article.category}</span>
                  <span className="text-[#F3F0E7]/30" aria-hidden="true">·</span>
                  <span className="text-[#F3F0E7]/60">{article.date}</span>
                  <span className="text-[#F3F0E7]/30" aria-hidden="true">·</span>
                  <span className="text-[#F3F0E7]/60">{article.readTime}</span>
                </div>

                <h3 className="font-display text-lg text-[#F3F0E7] group-hover:text-[#D8B683] transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-[#F3F0E7]/70 font-light mt-2 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-[#F3F0E7]/50 border-t border-[#1E2436]">
                <span className="truncate">{article.author}</span>
                <span className="text-[#B68A4E] group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                  Read <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A0A0A]/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-[#12141C] border border-[#B68A4E]/30 rounded-2xl overflow-hidden shadow-2xl my-8">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full btn-glass-liquid text-[#F3F0E7] cursor-pointer"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <img
                src={selectedArticle.featuredImage}
                alt={selectedArticle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-[#12141C]/40 to-transparent" />
            </div>

            <div className="p-6 sm:p-10 space-y-6">
              <div className="flex items-center gap-2 text-xs text-[#D8B683] font-medium">
                <span>{selectedArticle.category}</span>
                <span className="text-[#F3F0E7]/30">·</span>
                <span className="text-[#F3F0E7]/60">{selectedArticle.date}</span>
                <span className="text-[#F3F0E7]/30">·</span>
                <span className="text-[#F3F0E7]/60">{selectedArticle.readTime}</span>
              </div>

              <h2 className="font-display text-2xl sm:text-4xl text-[#F3F0E7] leading-tight">
                {selectedArticle.title}
              </h2>

              <p className="text-xs text-[#F3F0E7]/60 italic border-l-2 border-[#B68A4E] pl-3 py-0.5">
                Authored by {selectedArticle.author}
              </p>

              <div className="space-y-4 pt-4 border-t border-[#1E2436] text-sm text-[#F3F0E7]/85 font-light leading-relaxed">
                {selectedArticle.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-8 border-t border-[#1E2436] flex items-center justify-between">
                <span className="text-xs text-[#F3F0E7]/50">
                  Published in Aurevia Journal Monthly
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 btn-glass-liquid text-[#F3F0E7] text-xs uppercase tracking-wider font-medium rounded-lg transition-colors cursor-pointer"
                >
                  Close Essay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PARTNER / ADVERTISE DRAWER MODAL */}
      {partnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#12141C] border border-[#B68A4E]/40 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setPartnerModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full btn-glass-liquid text-[#F3F0E7] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {partnerSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#B68A4E]/20 border border-[#B68A4E] flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#D8B683]" />
                </div>
                <h3 className="font-display text-2xl text-[#F3F0E7]">
                  Proposal Received
                </h3>
                <p className="text-xs sm:text-sm text-[#F3F0E7]/70 font-light leading-relaxed max-w-sm mx-auto">
                  Our business development and editorial desk (media@aurevia-aviation.com) will review your brand brief and share the 2026 Media Kit within one business day.
                </p>
                <button
                  onClick={() => setPartnerModalOpen(false)}
                  className="px-7 py-3 btn-glass-liquid-brass text-[#F3F0E7] text-xs uppercase tracking-wider font-medium rounded-lg cursor-pointer shadow-md"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handlePartnerSubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
                    The Journal · Media & Partnerships
                  </span>
                  <h3 className="font-display text-2xl text-[#F3F0E7] mt-1">
                    Partner With The Journal
                  </h3>
                  <p className="text-xs text-[#F3F0E7]/70 mt-1 font-light">
                    Direct access to ultra-high-net-worth principals, family offices, and sovereign aviation clients globally.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1">
                      Contact Name
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerForm.name}
                      onChange={(e) => setPartnerForm({ ...partnerForm, name: e.target.value })}
                      className="w-full bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1">
                      Brand / Organization
                    </label>
                    <input
                      type="text"
                      required
                      value={partnerForm.brand}
                      onChange={(e) => setPartnerForm({ ...partnerForm, brand: e.target.value })}
                      className="w-full bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1">
                    Corporate Email
                  </label>
                  <input
                    type="email"
                    required
                    value={partnerForm.email}
                    onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                    className="w-full bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1">
                    Partnership Format
                  </label>
                  <select
                    value={partnerForm.format}
                    onChange={(e) => setPartnerForm({ ...partnerForm, format: e.target.value })}
                    className="w-full bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] outline-none cursor-pointer"
                  >
                    <option value="Sponsored Feature (Editorial & Photography)">Sponsored Feature (Editorial & Photography)</option>
                    <option value="Bespoke Print & Digital Placement">Bespoke Placement</option>
                    <option value="Private Event Sponsorship (Geneva / Dubai)">Private Event Sponsorship (Geneva / Dubai)</option>
                    <option value="Luxury Brand Affiliation / Co-Op">Luxury Brand Affiliation / Co-Op</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1">
                    Campaign Scope & Timing
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide desired publication dates, creative direction, or specific market focus..."
                    value={partnerForm.message}
                    onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                    className="w-full bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 btn-glass-liquid-brass font-medium text-xs tracking-wider uppercase rounded-lg cursor-pointer shadow-lg"
                >
                  Send Inquiry to Business Development
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* HEADLESS CMS DESK MODAL FOR EDITORIAL STAFF */}
      {cmsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A0A0A]/85 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-[#12141C] border border-[#B68A4E]/50 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setCmsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full btn-glass-liquid text-[#F3F0E7] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <form onSubmit={handlePublishArticle} className="space-y-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D8B683] font-medium block">
                  Staff Publishing Portal
                </span>
                <h3 className="font-display text-2xl text-[#F3F0E7] mt-1">
                  Publish New Journal Story
                </h3>
                <p className="text-xs text-[#F3F0E7]/70 mt-1 font-light">
                  Non-technical content management system. Directly injects new essays into the live publication.
                </p>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navigating the North Atlantic Track System"
                  value={cmsForm.title}
                  onChange={(e) => setCmsForm({ ...cmsForm, title: e.target.value })}
                  className="w-full bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1">
                    Category
                  </label>
                  <select
                    value={cmsForm.category}
                    onChange={(e) => setCmsForm({ ...cmsForm, category: e.target.value as any })}
                    className="w-full bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] outline-none cursor-pointer"
                  >
                    <option value="Aviation">Aviation</option>
                    <option value="Travel">Travel</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Partner Feature">Partner Feature</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1">
                    Author
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Julian Delacroix"
                    value={cmsForm.author}
                    onChange={(e) => setCmsForm({ ...cmsForm, author: e.target.value })}
                    className="w-full bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 5 min read"
                    value={cmsForm.readTime}
                    onChange={(e) => setCmsForm({ ...cmsForm, readTime: e.target.value })}
                    className="w-full bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1">
                  Editorial Excerpt (One sentence)
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Summary for article card..."
                  value={cmsForm.excerpt}
                  onChange={(e) => setCmsForm({ ...cmsForm, excerpt: e.target.value })}
                  className="w-full bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#F3F0E7]/60 mb-1">
                  Full Article Content (Separate paragraphs with double Enter)
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Paste complete essay prose here..."
                  value={cmsForm.contentParagraphs}
                  onChange={(e) => setCmsForm({ ...cmsForm, contentParagraphs: e.target.value })}
                  className="w-full bg-[#1E2436] border border-[#1E2436] focus:border-[#B68A4E] rounded py-2 px-3 text-xs text-[#F3F0E7] outline-none font-mono text-xs"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCmsOpen(false)}
                  className="px-5 py-2.5 text-xs text-[#F3F0E7]/80 hover:text-[#F3F0E7] btn-glass-liquid rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 btn-glass-liquid-brass font-medium text-xs tracking-wider uppercase rounded-lg cursor-pointer shadow-lg"
                >
                  Publish Immediately
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
