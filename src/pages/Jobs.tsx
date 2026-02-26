import { 
  Briefcase, 
  MapPin, 
  Users, 
  MoreHorizontal, 
  Plus,
  Search,
  Clock,
  Filter
} from 'lucide-react';

const jobs = [
  {
    id: 1,
    title: 'Senior Product Designer',
    department: 'Design',
    location: 'Удаленно',
    type: 'Полная занятость',
    applicants: 45,
    status: 'Активна',
    posted: '2 дня назад'
  },
  {
    id: 2,
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Москва, РФ',
    type: 'Полная занятость',
    applicants: 32,
    status: 'Активна',
    posted: '5 дней назад'
  },
  {
    id: 3,
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'Санкт-Петербург, РФ',
    type: 'Контракт',
    applicants: 18,
    status: 'На паузе',
    posted: '1 неделю назад'
  },
  {
    id: 4,
    title: 'Customer Success Lead',
    department: 'Sales',
    location: 'Удаленно',
    type: 'Полная занятость',
    applicants: 64,
    status: 'Активна',
    posted: '2 недели назад'
  },
];

export default function Jobs() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light text-white tracking-wide">Вакансии</h1>
          <p className="text-white/40 text-sm mt-1">Управление вакансиями и откликами.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl hover:bg-white/90 transition-colors text-sm font-medium">
          <Plus size={16} />
          Создать вакансию
        </button>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
        <div className="p-4 border-b border-white/10 flex gap-4">
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-white/70 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Поиск вакансий..." 
              className="w-full pl-10 pr-4 py-2 bg-black/20 border border-white/5 rounded-lg text-sm text-white placeholder-white/20 focus:outline-none focus:bg-black/40 focus:border-white/20 transition-all"
            />
          </div>
          <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-2">
            <Filter size={16} />
            <span>Фильтр</span>
          </button>
        </div>

        <table className="w-full text-left">
          <thead className="bg-white/5 text-white/40 text-[10px] uppercase tracking-widest font-medium">
            <tr>
              <th className="px-6 py-4 font-medium">Вакансии</th>
              <th className="px-6 py-4 font-medium">Отдел</th>
              <th className="px-6 py-4 font-medium">Локация</th>
              <th className="px-6 py-4 font-medium">Отклики</th>
              <th className="px-6 py-4 font-medium">Статус</th>
              <th className="px-6 py-4 font-medium">Опубликовано</th>
              <th className="px-6 py-4 text-right font-medium">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {jobs.map((job) => (
              <tr key={job.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 text-white/70 rounded-lg border border-white/5">
                      <Briefcase size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm">{job.title}</p>
                      <p className="text-xs text-white/40">{job.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-white/60">{job.department}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-white/60">
                    <MapPin size={14} className="text-white/30" />
                    {job.location}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-white/60">
                    <Users size={14} className="text-white/30" />
                    {job.applicants}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-medium border ${
                    job.status === 'Активна' 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                      : 'bg-white/5 text-white/40 border-white/10'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-white/40 font-mono text-xs">
                    <Clock size={14} />
                    {job.posted}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-white/20 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
