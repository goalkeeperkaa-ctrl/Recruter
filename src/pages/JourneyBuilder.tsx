import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  GripVertical, 
  Trash2, 
  Type, 
  Video, 
  FileText, 
  CheckSquare, 
  Settings,
  Plus,
  Play
} from 'lucide-react';

// Types
type BlockType = 'info' | 'video' | 'test' | 'form';

interface JourneyStep {
  id: string;
  type: BlockType;
  title: string;
  description: string;
}

const initialSteps: JourneyStep[] = [
  { id: '1', type: 'info', title: 'Добро пожаловать', description: 'О компании и ценностях' },
  { id: '2', type: 'video', title: 'Видео-знакомство', description: 'Запишите 1-минутное видео' },
  { id: '3', type: 'test', title: 'Оценка навыков', description: 'Базовый тест React & TypeScript' },
  { id: '4', type: 'form', title: 'Личные данные', description: 'Контакты и резюме' },
];

const blockTypes = [
  { type: 'info', icon: Type, label: 'Инфо-страница', desc: 'Текст, изображения, контент' },
  { type: 'video', icon: Video, label: 'Видео-интервью', desc: 'Запрос видеозаписи' },
  { type: 'test', icon: CheckSquare, label: 'Тест / Квиз', desc: 'Вопросы с вариантами' },
  { type: 'form', icon: FileText, label: 'Форма данных', desc: 'Сбор информации' },
];

const SortableStep: React.FC<{ step: JourneyStep, isSelected: boolean, onClick: () => void, onDelete: (e: React.MouseEvent) => void }> = ({ step, isSelected, onClick, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const Icon = blockTypes.find(b => b.type === step.type)?.icon || Type;

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={onClick}
      className={`group relative flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
        isSelected 
          ? 'bg-white/10 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
          : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'
      }`}
    >
      <div {...attributes} {...listeners} className="text-white/20 hover:text-white/60 cursor-grab active:cursor-grabbing p-1">
        <GripVertical size={20} />
      </div>
      
      <div className={`p-3 rounded-lg bg-black/20 border border-white/5 text-white/80`}>
        <Icon size={20} />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-white truncate text-sm">{step.title}</h4>
        <p className="text-xs text-white/40 truncate">{step.description}</p>
      </div>

      <button 
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-2 text-white/20 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default function JourneyBuilder() {
  const [steps, setSteps] = useState<JourneyStep[]>(initialSteps);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSteps((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addStep = (type: BlockType) => {
    const newStep: JourneyStep = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      title: `Новый ${type === 'info' ? 'Инфо' : type === 'video' ? 'Видео' : type === 'test' ? 'Тест' : 'Форма'} блок`,
      description: 'Нажмите для редактирования',
    };
    setSteps([...steps, newStep]);
    setSelectedId(newStep.id);
  };

  const deleteStep = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSteps(steps.filter(s => s.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const updateStep = (id: string, updates: Partial<JourneyStep>) => {
    setSteps(steps.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const selectedStep = steps.find(s => s.id === selectedId);

  return (
    <div className="h-[calc(100vh-10rem)] flex gap-6">
      {/* Left Sidebar: Blocks */}
      <div className="w-64 flex flex-col gap-4">
        <h3 className="font-medium text-white/60 px-1 text-sm uppercase tracking-wider">Блоки</h3>
        <div className="space-y-3">
          {blockTypes.map((block) => (
            <button
              key={block.type}
              onClick={() => addStep(block.type as BlockType)}
              className="w-full flex items-start gap-3 p-3 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all text-left group"
            >
              <div className={`p-2 rounded-lg bg-black/20 text-white/40 group-hover:text-white transition-colors`}>
                <block.icon size={16} />
              </div>
              <div>
                <span className="block font-medium text-white text-sm">{block.label}</span>
                <span className="block text-[10px] text-white/40 mt-0.5">{block.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Center: Canvas */}
      <div className="flex-1 bg-black/20 rounded-2xl border border-white/5 p-8 overflow-y-auto relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none opacity-50" />
        
        <div className="max-w-2xl mx-auto relative z-10">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-light text-white tracking-wide">Путь кандидата</h2>
              <p className="text-white/40 text-sm">Настройте этапность для "Senior Product Designer"</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/10 flex items-center gap-2">
                <Play size={14} />
                Предпросмотр
              </button>
              <button className="px-4 py-2 bg-white text-black rounded-xl text-sm font-medium hover:bg-white/90">
                Сохранить
              </button>
            </div>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={steps.map(s => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-3">
                {steps.map((step) => (
                  <SortableStep
                    key={step.id}
                    step={step}
                    isSelected={selectedId === step.id}
                    onClick={() => setSelectedId(step.id)}
                    onDelete={(e) => deleteStep(e, step.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {steps.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-xl">
              <Plus className="mx-auto text-white/20 mb-2" size={32} />
              <p className="text-white/40 font-medium">Добавьте блок, чтобы начать</p>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar: Properties */}
      <div className="w-80 glass-panel rounded-2xl p-6 overflow-y-auto">
        {selectedStep ? (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-6 border-b border-white/10">
              <div className="p-2 rounded-lg bg-white/5 text-white border border-white/10">
                {blockTypes.find(b => b.type === selectedStep.type)?.icon({ size: 20 }) || <Type size={20} />}
              </div>
              <div>
                <h3 className="font-medium text-white">Редактировать этап</h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest">{selectedStep.type} блок</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Название</label>
                <input
                  type="text"
                  value={selectedStep.title}
                  onChange={(e) => updateStep(selectedStep.id, { title: e.target.value })}
                  className="w-full px-3 py-2.5 bg-black/20 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-white/60 mb-1.5 uppercase tracking-wider">Описание</label>
                <textarea
                  value={selectedStep.description}
                  onChange={(e) => updateStep(selectedStep.id, { description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2.5 bg-black/20 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all resize-none"
                />
              </div>

              {selectedStep.type === 'video' && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-4">
                  <h4 className="text-sm font-medium text-white flex items-center gap-2">
                    <Settings size={14} />
                    Настройки видео
                  </h4>
                  <div>
                    <label className="block text-xs font-medium text-white/40 mb-1.5">Лимит времени</label>
                    <select className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-sm text-white focus:outline-none">
                      <option>30 секунд</option>
                      <option>1 минута</option>
                      <option>2 минуты</option>
                      <option>5 минут</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="retries" className="rounded border-white/20 bg-black/20 text-indigo-500 focus:ring-offset-0 focus:ring-0" />
                    <label htmlFor="retries" className="text-sm text-white/60">Разрешить пересдачу</label>
                  </div>
                </div>
              )}

              {selectedStep.type === 'test' && (
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-4">
                  <h4 className="text-sm font-medium text-white flex items-center gap-2">
                    <Settings size={14} />
                    Настройки теста
                  </h4>
                  <button className="w-full py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/5">
                    Редактировать вопросы
                  </button>
                  <div className="flex items-center justify-between text-sm text-white/60">
                    <span>Проходной балл</span>
                    <span className="font-medium text-white">70%</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center text-white/20">
            <Settings size={48} className="mb-4 opacity-20" />
            <p className="text-sm">Выберите этап для редактирования</p>
          </div>
        )}
      </div>
    </div>
  );
}
