import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  GitMerge, 
  BarChart3, 
  Settings, 
  Bell, 
  Search,
  UserCircle,
  Hexagon
} from 'lucide-react';
import { clsx } from 'clsx';

const navigation = [
  { name: 'Дашборд', href: '/', icon: LayoutDashboard },
  { name: 'Кандидаты', href: '/candidates', icon: Users },
  { name: 'Вакансии', href: '/jobs', icon: Briefcase },
  { name: 'Путь кандидата', href: '/journey', icon: GitMerge },
  { name: 'Аналитика', href: '/analytics', icon: BarChart3 },
  { name: 'Настройки', href: '/settings', icon: Settings },
];

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen p-4 md:p-6 flex gap-6 overflow-hidden max-h-screen">
      {/* Left Sidebar - Floating Glass Panel */}
      <div className="w-20 lg:w-72 flex-shrink-0 flex flex-col gap-6">
        {/* Brand Card */}
        <div className="glass-panel rounded-3xl p-6 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Hexagon size={24} fill="white" fillOpacity={0.2} />
          </div>
          <div className="hidden lg:block">
            <h1 className="text-lg font-bold tracking-wide text-white">NEXUS<span className="font-light text-white/50">HR</span></h1>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Recruit OS 2.0</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="glass-panel rounded-3xl p-4 flex-1 flex flex-col gap-2 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={clsx(
                  'flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group',
                  isActive
                    ? 'bg-white/10 text-white shadow-lg border border-white/5'
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                )}
              >
                <item.icon size={20} className={clsx("transition-transform duration-300", isActive && "scale-110")} />
                <span className="hidden lg:block font-medium tracking-wide text-sm">{item.name}</span>
                {isActive && (
                  <div className="hidden lg:block ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="glass-panel rounded-3xl p-4">
          <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-white/5 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
              <UserCircle size={24} className="text-white/80" />
            </div>
            <div className="hidden lg:block min-w-0">
              <p className="text-sm font-medium text-white truncate">Алексей Смирнов</p>
              <p className="text-xs text-white/40 truncate">Администратор</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        {/* Top Bar */}
        <header className="h-20 glass-panel rounded-3xl px-8 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-6 flex-1">
            <h2 className="text-xl font-light text-white tracking-wide">
              {navigation.find(n => n.href === location.pathname)?.name || 'Дашборд'}
            </h2>
            <div className="h-8 w-px bg-white/10 mx-2 hidden md:block"></div>
            <div className="relative max-w-md w-full hidden md:block group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white/70 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Поиск кандидатов, вакансий..." 
                className="w-full pl-12 pr-4 py-2.5 bg-black/20 border border-white/5 rounded-full text-sm text-white placeholder-white/20 focus:outline-none focus:bg-black/40 focus:border-white/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"></span>
            </button>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="flex-1 glass-panel rounded-3xl p-8 overflow-y-auto relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-3xl" />
          <div className="relative z-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
