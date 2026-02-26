import { 
  Bot, 
  Phone, 
  CreditCard, 
  Users, 
  Shield, 
  Bell,
  Check,
  Settings as SettingsIcon
} from 'lucide-react';

const sections = [
  { id: 'general', label: 'Общие', icon: SettingsIcon },
  { id: 'integrations', label: 'Интеграции', icon: Bot },
  { id: 'telephony', label: 'AI Телефония', icon: Phone },
  { id: 'team', label: 'Команда', icon: Users },
  { id: 'billing', label: 'Биллинг', icon: CreditCard },
  { id: 'security', label: 'Безопасность', icon: Shield },
  { id: 'notifications', label: 'Уведомления', icon: Bell },
];

export default function Settings() {
  return (
    <div className="flex gap-8 h-full">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0">
        <h1 className="text-2xl font-light text-white tracking-wide mb-6">Настройки</h1>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                section.id === 'integrations' 
                  ? 'bg-white/10 text-white border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                  : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              <section.icon size={18} />
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-3xl space-y-8 overflow-y-auto pr-4 custom-scrollbar">
        
        {/* Telegram Integration */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/20">
                <Bot size={28} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Telegram Бот</h3>
                <p className="text-sm text-white/40">Подключите бота для уведомлений и обновлений по кандидатам.</p>
              </div>
              <div className="ml-auto">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Check size={12} />
                  Подключено
                </span>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Токен бота</label>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  value="71283812:AAHkq8..." 
                  readOnly
                  className="flex-1 px-3 py-2.5 bg-black/20 border border-white/10 rounded-xl text-sm text-white/40 font-mono"
                />
                <button className="px-4 py-2 border border-white/10 rounded-xl text-sm font-medium text-white/60 hover:bg-white/5 hover:text-white transition-colors">
                  Сгенерировать
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-white">Уведомления</p>
                <p className="text-xs text-white/40">Получать уведомления о новых откликах</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
              </label>
            </div>
          </div>
        </div>

        {/* AI Telephony */}
        <div className="glass-panel rounded-2xl overflow-hidden border border-white/10">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400 border border-purple-500/20">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">AI Телефония</h3>
                <p className="text-sm text-white/40">Настройка голосового ассистента для скрининга.</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Провайдер голоса</label>
                <select className="w-full px-3 py-2.5 bg-black/20 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/30">
                  <option>ElevenLabs</option>
                  <option>Google Cloud TTS</option>
                  <option>Amazon Polly</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Голос</label>
                <select className="w-full px-3 py-2.5 bg-black/20 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/30">
                  <option>Rachel (American, Professional)</option>
                  <option>Josh (American, Casual)</option>
                  <option>Bella (British, Professional)</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Системный промпт</label>
              <textarea 
                rows={4}
                className="w-full px-3 py-2.5 bg-black/20 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/30 resize-none"
                defaultValue="Вы — полезный ассистент по рекрутингу для RecruitAI. Ваша цель — провести скрининг кандидатов на позицию [Название вакансии]. Будьте профессиональны, кратки и дружелюбны."
              />
            </div>

            <div className="flex items-center gap-3 p-4 bg-amber-500/10 text-amber-200 rounded-xl text-sm border border-amber-500/20">
              <Shield size={16} className="text-amber-400" />
              <span>Звонки записываются и транскрибируются автоматически для соблюдения требований.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
