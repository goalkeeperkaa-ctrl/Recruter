import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
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
import CandidateCard from '../components/CandidateCard';
import { Plus, Filter, Search } from 'lucide-react';

// Mock Data
const initialData = {
  columns: {
    'new': { id: 'new', title: 'Новые', color: 'bg-blue-500' },
    'screening': { id: 'screening', title: 'Скрининг', color: 'bg-purple-500' },
    'interview': { id: 'interview', title: 'Интервью', color: 'bg-indigo-500' },
    'offer': { id: 'offer', title: 'Оффер', color: 'bg-amber-500' },
    'hired': { id: 'hired', title: 'Нанят', color: 'bg-emerald-500' },
  },
  candidates: {
    'c1': { id: 'c1', name: 'Анна Смирнова', role: 'Product Designer', score: 94, tags: ['Senior', 'Remote'] },
    'c2': { id: 'c2', name: 'Михаил Романов', role: 'Frontend Dev', score: 88, tags: ['Mid', 'On-site'] },
    'c3': { id: 'c3', name: 'Елена Козлова', role: 'Head of Sales', score: 98, tags: ['Exec', 'Remote'] },
    'c4': { id: 'c4', name: 'Игорь Петров', role: 'Legal Counsel', score: 92, tags: ['Senior', 'Contract'] },
    'c5': { id: 'c5', name: 'Леонид Литов', role: 'Finance Manager', score: 75, tags: ['Senior', 'On-site'] },
    'c6': { id: 'c6', name: 'Раиса Захарова', role: 'Paralegal', score: 85, tags: ['Junior', 'Hybrid'] },
    'c7': { id: 'c7', name: 'Дарья Павлова', role: 'Executive Assistant', score: 99, tags: ['Senior', 'Remote'] },
  },
  columnOrder: ['new', 'screening', 'interview', 'offer', 'hired'],
  columnsData: {
    'new': ['c1', 'c2'],
    'screening': ['c3'],
    'interview': ['c4', 'c5'],
    'offer': ['c6'],
    'hired': ['c7'],
  }
};

const SortableItem: React.FC<{ id: string, candidate: any }> = ({ id, candidate }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-3">
      <CandidateCard candidate={candidate} isDragging={isDragging} />
    </div>
  );
};

export default function Candidates() {
  const [data, setData] = useState(initialData);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findContainer = (id: string) => {
    if (id in data.columnsData) {
      return id;
    }
    return Object.keys(data.columnsData).find((key) =>
      data.columnsData[key as keyof typeof data.columnsData].includes(id)
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    const overId = over?.id;

    if (!overId || active.id === overId) return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(overId as string);

    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }

    setData((prev) => {
      const activeItems = prev.columnsData[activeContainer as keyof typeof prev.columnsData];
      const overItems = prev.columnsData[overContainer as keyof typeof prev.columnsData];
      const activeIndex = activeItems.indexOf(active.id as string);
      const overIndex = overItems.indexOf(overId as string);

      let newIndex;
      if (overId in prev.columnsData) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        columnsData: {
          ...prev.columnsData,
          [activeContainer]: [
            ...prev.columnsData[activeContainer as keyof typeof prev.columnsData].filter((item) => item !== active.id),
          ],
          [overContainer]: [
            ...prev.columnsData[overContainer as keyof typeof prev.columnsData].slice(0, newIndex),
            active.id as string,
            ...prev.columnsData[overContainer as keyof typeof prev.columnsData].slice(newIndex, prev.columnsData[overContainer as keyof typeof prev.columnsData].length),
          ],
        },
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over?.id as string);

    if (
      activeContainer &&
      overContainer &&
      activeContainer === overContainer
    ) {
      const activeIndex = data.columnsData[activeContainer as keyof typeof data.columnsData].indexOf(active.id as string);
      const overIndex = data.columnsData[overContainer as keyof typeof data.columnsData].indexOf(over?.id as string);

      if (activeIndex !== overIndex) {
        setData((prev) => ({
          ...prev,
          columnsData: {
            ...prev.columnsData,
            [activeContainer]: arrayMove(
              prev.columnsData[activeContainer as keyof typeof prev.columnsData],
              activeIndex,
              overIndex
            ),
          },
        }));
      }
    }

    setActiveId(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-light text-white tracking-wide">Кандидаты</h1>
          <p className="text-white/40 text-sm mt-1">Управление воронкой рекрутинга.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors text-sm">
            <Filter size={16} />
            Фильтр
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl hover:bg-white/90 transition-colors text-sm font-medium">
            <Plus size={16} />
            Добавить
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 h-full min-w-[1200px]">
            {data.columnOrder.map((columnId) => {
              const column = data.columns[columnId as keyof typeof data.columns];
              const candidateIds = data.columnsData[columnId as keyof typeof data.columnsData];

              return (
                <div key={columnId} className="flex-1 flex flex-col bg-black/20 rounded-2xl border border-white/5 min-w-[280px]">
                  <div className="p-4 border-b border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full ${column.color} shadow-[0_0_8px_currentColor]`} />
                      <h3 className="font-medium text-white/90 text-sm tracking-wide">{column.title}</h3>
                    </div>
                    <span className="bg-white/5 text-white/40 px-2 py-0.5 rounded-md text-[10px] font-mono">
                      {candidateIds.length}
                    </span>
                  </div>
                  
                  <div className="p-3 flex-1 overflow-y-auto custom-scrollbar">
                    <SortableContext
                      id={columnId}
                      items={candidateIds}
                      strategy={verticalListSortingStrategy}
                    >
                      {candidateIds.map((candidateId) => (
                        <SortableItem 
                          key={candidateId} 
                          id={candidateId} 
                          candidate={data.candidates[candidateId as keyof typeof data.candidates]} 
                        />
                      ))}
                    </SortableContext>
                  </div>
                </div>
              );
            })}
          </div>

          <DragOverlay>
            {activeId ? (
              <CandidateCard 
                candidate={data.candidates[activeId as keyof typeof data.candidates]} 
                isDragging 
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
