import { MoreHorizontal, Phone, Video, MessageSquare } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  role: string;
  score: number;
  tags: string[];
  avatar?: string;
}

interface CandidateCardProps {
  candidate: Candidate;
  isDragging?: boolean;
}

export default function CandidateCard({ candidate, isDragging }: CandidateCardProps) {
  return (
    <div 
      className={`glass-button p-4 rounded-2xl border transition-all cursor-grab active:cursor-grabbing group ${
        isDragging 
          ? 'border-white/30 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)] rotate-2' 
          : 'border-white/5 hover:border-white/20'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center text-white font-medium text-sm">
            {candidate.avatar ? (
              <img src={candidate.avatar} alt={candidate.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              candidate.name.split(' ').map(n => n[0]).join('').substring(0, 2)
            )}
          </div>
          <div>
            <h4 className="font-medium text-white text-sm tracking-wide">{candidate.name}</h4>
            <p className="text-xs text-white/40">{candidate.role}</p>
          </div>
        </div>
        <button className="text-white/20 hover:text-white transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className={`px-2.5 py-1 rounded-full text-[10px] font-medium border ${
          candidate.score >= 90 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
          candidate.score >= 70 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
          'bg-red-500/10 text-red-400 border-red-500/20'
        }`}>
          {candidate.score}% Совпадение
        </div>
        {candidate.tags.map(tag => (
          <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/5 text-white/60 border border-white/5">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex gap-1">
          <button className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Позвонить">
            <Phone size={14} />
          </button>
          <button className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Видео-интервью">
            <Video size={14} />
          </button>
          <button className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors" title="Сообщение">
            <MessageSquare size={14} />
          </button>
        </div>
        <span className="text-[10px] text-white/30 font-mono">2д назад</span>
      </div>
    </div>
  );
}
