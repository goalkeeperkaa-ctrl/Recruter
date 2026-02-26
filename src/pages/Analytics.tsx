import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Calendar } from 'lucide-react';

const funnelData = [
  { name: 'Отклик', value: 1240 },
  { name: 'Скрининг', value: 850 },
  { name: 'Интервью', value: 420 },
  { name: 'Оффер', value: 180 },
  { name: 'Нанят', value: 145 },
];

const sourceData = [
  { name: 'LinkedIn', value: 45 },
  { name: 'Рефералы', value: 25 },
  { name: 'Сайт', value: 20 },
  { name: 'Борды', value: 10 },
];

const timeToHireData = [
  { month: 'Янв', days: 24 },
  { month: 'Фев', days: 22 },
  { month: 'Мар', days: 20 },
  { month: 'Апр', days: 18 },
  { month: 'Май', days: 19 },
  { month: 'Июн', days: 17 },
];

const COLORS = ['#818cf8', '#a78bfa', '#34d399', '#fbbf24'];

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light text-white tracking-wide">Аналитика</h1>
          <p className="text-white/40 text-sm mt-1">Глубокая аналитика метрик найма.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm">
            <Calendar size={16} />
            Последние 30 дней
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl hover:bg-white/90 transition-colors text-sm font-medium">
            <Download size={16} />
            Экспорт отчета
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Funnel Conversion */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-medium text-white mb-6">Конверсия воронки</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12, fill: 'rgba(255,255,255,0.4)'}} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ 
                    backgroundColor: 'rgba(20, 20, 20, 0.9)', 
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" fill="#818cf8" radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Efficiency */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-medium text-white mb-6">Эффективность каналов</h3>
          <div className="h-80 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
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
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: 'rgba(255,255,255,0.6)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time to Hire Trend */}
        <div className="glass-panel rounded-2xl p-6 border border-white/10 lg:col-span-2">
          <h3 className="text-lg font-medium text-white mb-6">Время найма (Дни)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeToHireData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  dy={10} 
                  tick={{fill: 'rgba(255,255,255,0.4)', fontSize: 12}}
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
                <Line 
                  type="monotone" 
                  dataKey="days" 
                  stroke="#a78bfa" 
                  strokeWidth={3}
                  dot={{ r: 6, fill: '#a78bfa', strokeWidth: 2, stroke: '#1a1a1a' }}
                  activeDot={{ r: 8, fill: '#fff' }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
