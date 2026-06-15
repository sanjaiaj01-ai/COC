import { useState, FormEvent } from 'react';
import { Mail, Shield, Send, CheckCircle, Swords } from 'lucide-react';

export default function ContactSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('project'); // 'project' | 'clan' | 'greetings'
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Simulate successful form delivery
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section id="contact" className="py-24 bg-slate-950 relative border-t border-slate-900">
      {/* Visual background elements */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-950/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-16">
          <p className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5">
            <Swords className="w-3.5 h-3.5" /> ESTABLISH BEACON LINK
          </p>
          <h2 className="font-sans font-black text-3xl sm:text-4xl text-white tracking-tight">
            Initiate Deployment Signals
          </h2>
          <p className="font-sans text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Submit campaign inquiries, full-stack recruitment requests, or petition to ally with the Town hall 16 max division.
          </p>
          <div className="h-1 w-12 bg-cyan-500 rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Side: Contact details */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-center">
            
            <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm space-y-4">
              <h3 className="font-sans font-bold text-white text-base">Inquiry Routing</h3>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Signals are prioritized on operational request types. Standard software architectures are queued for 24-hour scoping analysis. Clan war alliances require Town Hall 15/16 defensive standards.
              </p>
            </div>

            <div className="space-y-4 font-sans text-xs sm:text-sm">
              <div className="flex items-center space-x-3.5 text-slate-350">
                <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 Shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-mono text-[9px] text-slate-500 font-bold uppercase">SECURED ENCRYPTION NODE</p>
                  <p className="font-semibold text-white">sanjai01ajds@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-3.5 text-slate-350">
                <div className="w-10 h-10 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 Shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-mono text-[9px] text-slate-500 font-bold uppercase">DIV DIVISION CODES</p>
                  <p className="font-semibold text-white">Clan: #2QL8Y9RVG (Aqua Vanguard)</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Form Card */}
          <div className="lg:col-span-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4 animate-scaleUp">
                  <div className="h-14 w-14 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400">
                    <CheckCircle className="w-8 h-8 font-black" />
                  </div>
                  <h4 className="font-sans font-bold text-white text-lg sm:text-xl">Transmission Synced Successfully!</h4>
                  <p className="font-sans text-xs text-slate-400 max-w-sm">
                    Your campaign query has bypassed local proxy relays and routed into General Axe’s prioritized terminal. A response will be dispatched soon.
                  </p>
                  <p className="font-mono text-[10px] text-emerald-400 font-bold select-none uppercase tracking-widest pt-2">STATUS: TRANSMITTING SECURE BEACON...</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Grid row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="font-mono text-[10px] text-slate-400 block mb-1.5 font-bold uppercase">COMMUNICATOR NAME</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 text-white rounded-md px-4 py-2.5 font-sans text-xs sm:text-sm placeholder-slate-650"
                        placeholder="E.g., Chief Patrick"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="font-mono text-[10px] text-slate-400 block mb-1.5 font-bold uppercase">RETURN FREQUENCY LAYER (EMAIL)</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 text-white rounded-md px-4 py-2.5 font-sans text-xs sm:text-sm placeholder-slate-650"
                        placeholder="E.g., champion@clashofclans.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Topic Select buttons */}
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-slate-400 block font-bold uppercase">SELECT FREQUENCY TUNNEL</span>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setTopic('project')}
                        className={`py-2.5 rounded font-sans text-[10px] sm:text-xs font-bold cursor-pointer border transition-all ${
                          topic === 'project'
                            ? 'bg-cyan-950/60 text-cyan-400 border-cyan-800/80 shadow-[0_0_10px_rgba(22,182,212,0.15)]'
                            : 'bg-slate-950 text-slate-450 border-slate-850 hover:text-white'
                        }`}
                      >
                        React Project Scope
                      </button>
                      <button
                        type="button"
                        onClick={() => setTopic('clan')}
                        className={`py-2.5 rounded font-sans text-[10px] sm:text-xs font-bold cursor-pointer border transition-all ${
                          topic === 'clan'
                            ? 'bg-cyan-950/60 text-cyan-400 border-cyan-800/80 shadow-[0_0_10px_rgba(22,182,212,0.15)]'
                            : 'bg-slate-950 text-slate-450 border-slate-850 hover:text-white'
                        }`}
                      >
                        Clan Recruitment
                      </button>
                      <button
                        type="button"
                        onClick={() => setTopic('greetings')}
                        className={`py-2.5 rounded font-sans text-[10px] sm:text-xs font-bold cursor-pointer border transition-all ${
                          topic === 'greetings'
                            ? 'bg-cyan-950/60 text-cyan-400 border-cyan-800/80 shadow-[0_0_10px_rgba(22,182,212,0.15)]'
                            : 'bg-slate-950 text-slate-450 border-slate-850 hover:text-white'
                        }`}
                      >
                        General Salute
                      </button>
                    </div>
                  </div>

                  {/* Message body */}
                  <div>
                    <label className="font-mono text-[10px] text-slate-400 block mb-1.5 font-bold uppercase font-sans">SIGNAL CONTENT (MESSAGE)</label>
                    <textarea
                      required
                      placeholder="Specify your technical architectures spec, or map and war trophies status for roster review..."
                      rows={4}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-cyan-500/50 text-white rounded-md p-4 font-sans text-xs sm:text-sm placeholder-slate-650"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {/* Link submit button */}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-950 font-sans text-xs font-bold uppercase tracking-wider rounded-md transition-shadow hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Deploy Signal Payload</span>
                  </button>

                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
