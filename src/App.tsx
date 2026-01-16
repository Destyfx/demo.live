import { useState, useEffect } from 'react';
import { Lock, Target, Zap, Brain, Shield, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';
import { supabase } from './lib/supabase';

function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email, name: name || null }]);

      if (error) {
        if (error.code === '23505') {
          setErrorMessage('This email is already on the waitlist!');
        } else {
          setErrorMessage('Something went wrong. Please try again.');
        }
        setSubmitStatus('error');
      } else {
        setSubmitStatus('success');
        setEmail('');
        setName('');
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    {
      icon: Target,
      title: 'Precision Focus',
      description: 'AI-powered focus sessions that adapt to your workflow and eliminate distractions.',
    },
    {
      icon: Brain,
      title: 'Neural Tracking',
      description: 'Advanced analytics that map your productivity patterns and optimize performance.',
    },
    {
      icon: Zap,
      title: 'Instant Lock Mode',
      description: 'One-tap activation to enter deep work state with smart environment controls.',
    },
    {
      icon: Shield,
      title: 'Distraction Shield',
      description: 'Intelligent blocking system that learns and prevents your unique distractions.',
    },
    {
      icon: TrendingUp,
      title: 'Growth Metrics',
      description: 'Real-time insights into your discipline journey with actionable improvements.',
    },
    {
      icon: CheckCircle2,
      title: 'Goal Mastery',
      description: 'Structured achievement system designed by behavioral psychologists.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-black to-teal-950/20" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent absolute left-1/4 animate-scan" />
        <div className="h-full w-px bg-gradient-to-b from-transparent via-teal-500 to-transparent absolute right-1/4 animate-scan" style={{ animationDelay: '3s' }} />
      </div>

      <div className="relative z-10">
        <nav className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <Lock className="w-8 h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
              </div>
              <span className="text-2xl font-bold tracking-tighter">LOCKEDIN</span>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-6">
          <section className="min-h-[90vh] flex flex-col items-center justify-center text-center pt-20 pb-32">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-30 animate-glow" />
                <Lock className="w-24 h-24 text-cyan-400 relative animate-float mx-auto" strokeWidth={1.5} />
              </div>

              <h1 className="text-7xl md:text-8xl font-black mb-6 tracking-tighter">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-teal-200 bg-clip-text text-transparent">
                  LOCKED IN
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 mb-4 max-w-2xl mx-auto font-light tracking-wide">
                The ultimate discipline protocol for those who refuse to settle
              </p>

              <p className="text-lg text-gray-500 mb-12 max-w-xl mx-auto">
                Transform your focus into your superpower. Join the elite who've mastered distraction.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="#waitlist" className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-lg font-semibold hover:from-cyan-500 hover:to-teal-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105">
                  <span className="flex items-center gap-2">
                    Get Early Access
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-lg transition-opacity" />
                </a>
              </div>

              <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span>500+ Waiting</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                  <span>Launching Q1 2026</span>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Peak Performance Engineering
              </h2>
              <p className="text-gray-400 text-lg">
                Designed for the relentless. Built for results.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300" />

                  <div className="relative">
                    <div className="mb-4 inline-block">
                      <div className="relative">
                        <feature.icon className="w-12 h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors" strokeWidth={1.5} />
                        <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="waitlist" className="py-32">
            <div className="max-w-2xl mx-auto text-center">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-teal-500 blur-3xl opacity-30" />
                <h2 className="text-5xl md:text-6xl font-bold mb-6 relative">
                  <span className="bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                    Secure Your Spot
                  </span>
                </h2>
              </div>

              <p className="text-gray-400 text-lg mb-12">
                Limited early access. First 1,000 members get lifetime premium benefits.
              </p>

              {submitStatus === 'success' ? (
                <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 border border-teal-500/50 rounded-2xl p-12 animate-slide-up">
                  <CheckCircle2 className="w-16 h-16 text-teal-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">You're On The List!</h3>
                  <p className="text-gray-400">
                    Welcome to the future of focus. We'll notify you as soon as we launch.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative group">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name (optional)"
                      className="w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors text-white placeholder-gray-600"
                    />
                    <div className="absolute inset-0 bg-cyan-500 opacity-0 group-focus-within:opacity-5 rounded-xl transition-opacity pointer-events-none" />
                  </div>

                  <div className="relative group">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                      className="w-full px-6 py-4 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:border-cyan-500 transition-colors text-white placeholder-gray-600"
                    />
                    <div className="absolute inset-0 bg-cyan-500 opacity-0 group-focus-within:opacity-5 rounded-xl transition-opacity pointer-events-none" />
                  </div>

                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-sm">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-xl font-semibold hover:from-cyan-500 hover:to-teal-500 transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transform"
                  >
                    {isSubmitting ? 'Joining...' : 'Join The Waitlist'}
                  </button>

                  <p className="text-xs text-gray-600 mt-4">
                    By joining, you agree to receive updates about LOCKEDIN. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </div>
          </section>
        </main>

        <footer className="border-t border-gray-900 py-12">
          <div className="container mx-auto px-6 text-center text-gray-600">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-cyan-400" />
              <span className="font-semibold text-white">LOCKEDIN</span>
            </div>
            <p className="text-sm">
              2026 LOCKEDIN. Engineered for excellence.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
