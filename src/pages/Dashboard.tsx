import { 
  Users, 
  Clock, 
  TrendingUp, 
  CheckCircle2, 
  MoreHorizontal,
  PhoneCall,
  Video,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const stats = [
  { 
    name: 'Активные кандидаты', 
    value: '1,248', 
    change: '+12%', 
    trend: 'up',
    icon: Users,
    color: 'text-blue-400'
  },
  { 
    name: 'Время найма', 
    value: '18д', 
    change: '-4д', 
    trend: 'down', // good for time to hire
    icon: Clock,
    color: 'text-purple-400'
  },
  { 
    name: 'Принятие офферов', 
    value: '84%', 
    change: '+2.4%', 
    trend: 'up',
    icon: CheckCircle2,
    color: 'text-emerald-400'
  },
  { 
    name: 'AI Интервью', 
    value: '432', 
    change: '+28%', 
    trend: 'up',
    icon: PhoneCall,
    color: 'text-amber-400'
  },
];

const chartData = [
  { name: 'Пн', candidates: 45, interviews: 12 },
  { name: 'Вт', candidates: 52, interviews: 15 },
  { name: 'Ср', candidates: 38, interviews: 18 },
  { name: 'Чт', candidates: 65, interviews: 24 },
  { name: 'Пт', candidates: 48, interviews: 20 },
  { name: 'Сб', candidates: 25, interviews: 8 },
  { name: 'Вс', candidates: 15, interviews: 4 },
];

const recentActivity = [
  {
    id: 1,
    user: 'Анна Петрова',
    action: 'завершила видео-интервью',
    target: 'Senior Frontend Dev',
    time: '2ч назад',
    icon: Video,
    iconColor: 'text-blue-400'
  },
  {
    id: 2,
    user: 'AI Ассистент',
    action: 'проверил резюме',
    target: 'Михаил Иванов (Скор: 92%)',
    time: '3ч назад',
    icon: TrendingUp,
    iconColor: 'text-purple-400'
  },
  {
    id: 3,
    user: 'Дмитрий Соколов',
    action: 'принял оффер',
    target: 'Product Designer',
    time: '5ч назад',
    icon: CheckCircle2,
    iconColor: 'text-emerald-400'
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="glass-button rounded-2xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={64} className={stat.color} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${stat.color}`}>
                  <stat.icon size={18} />
                </div>
                <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{stat.name}</span>
              </div>
              <div className="flex items-end gap-3">
                <h3 className="text-3xl font-light text-white tracking-tight">{stat.value}</h3>
                <div className={`flex items-center text-xs font-medium mb-1.5 ${
                  stat.trend === 'up' || (stat.name === 'Time to Hire' && stat.trend === 'down') 
                    ? 'text-emerald-400' 
                    : 'text-red-400'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-button rounded-2xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-medium text-white">Активность воронки</h2>
              <p className="text-xs text-white/40 mt-1">Кандидаты vs Интервью за неделю</p>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-colors">
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCandidates" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} 
                  dy={10} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(20, 20, 20, 0.9)', 
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="candidates" 
                  stroke="#818cf8" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorCandidates)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="interviews" 
                  stroke="#34d399" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorInterviews)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-button rounded-2xl p-6 border border-white/10">
          <h2 className="text-lg font-medium text-white mb-6">Недавняя активность</h2>
          <div className="space-y-6">
            {recentActivity.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-white/5 border border-white/10 group-hover:border-white/20 transition-colors`}>
                  <item.icon size={16} className={item.iconColor} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-white/90 truncate">
                    <span className="font-medium text-white">{item.user}</span> <span className="text-white/60">{item.action}</span>
                  </p>
                  <p className="text-xs font-medium text-white/40 mt-1 truncate">{item.target}</p>
                  <p className="text-[10px] text-white/30 mt-1 font-mono">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-xs font-medium uppercase tracking-wider text-white/60 hover:text-white border border-white/10 rounded-xl hover:bg-white/5 transition-all">
            Смотреть всю активность
          </button>
        </div>
      </div>
    </div>
  );
}
