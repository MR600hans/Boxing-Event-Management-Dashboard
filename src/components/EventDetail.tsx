import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from './ui/input';
import { useState } from 'react';

export function EventDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  if (id !== '1') {
    return (
      <div className="container mx-auto px-6 py-8 text-white">
        <p>找不到此賽事。</p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate(-1)}>
          返回
        </Button>
      </div>
    );
  }

  const [form, setForm] = useState({
    name: '世界拳王爭霸戰',
    date: '2025-06-01 19:00',
    location: '台北小巨蛋',
    headReferee: '張大志',
    judge1: '李明',
    judge2: '王偉',
    judge3: '陳富',
    redFighter: '林育廷',
    blueFighter: '周建宏',
  });

  const handleChange = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    console.log('Save data', form);
    alert('已儲存（僅示範，不會持久化）');
    setEditing(false);
  };

  return (
    <div className="container mx-auto px-6 py-8 text-white">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="mb-4 text-gray-400 hover:text-white hover:bg-[var(--charcoal)]">
        <ArrowLeft className="w-4 h-4 mr-1" /> 返回
      </Button>

      <h2 className="text-2xl mb-6">賽事詳情</h2>

      <div className="space-y-4 bg-[var(--charcoal-light)] p-6 rounded-lg border border-[var(--charcoal-lighter)]">
        <EditableRow editing={editing} label="比賽名稱" value={form.name} onChange={(v)=>handleChange('name',v)} />
        <EditableRow editing={editing} label="比賽時間" value={form.date} onChange={(v)=>handleChange('date',v)} />
        <EditableRow editing={editing} label="比賽地點" value={form.location} onChange={(v)=>handleChange('location',v)} />
        <EditableRow editing={editing} label="主裁判" value={form.headReferee} onChange={(v)=>handleChange('headReferee',v)} />
        <EditableRow editing={editing} label="裁判 1" value={form.judge1} onChange={(v)=>handleChange('judge1',v)} />
        <EditableRow editing={editing} label="裁判 2" value={form.judge2} onChange={(v)=>handleChange('judge2',v)} />
        <EditableRow editing={editing} label="裁判 3" value={form.judge3} onChange={(v)=>handleChange('judge3',v)} />
        <EditableRow editing={editing} label="紅方選手" value={form.redFighter} onChange={(v)=>handleChange('redFighter',v)} />
        <EditableRow editing={editing} label="藍方選手" value={form.blueFighter} onChange={(v)=>handleChange('blueFighter',v)} />

        <div className="flex justify-end pt-4 gap-2">
          {!editing ? (
            <Button onClick={() => setEditing(true)} className="bg-[var(--boxing-blue)] hover:bg-[var(--boxing-red)]">
              編輯
            </Button>
          ) : (
            <Button onClick={handleSave} className="bg-[var(--boxing-blue)] hover:bg-[var(--boxing-red)]">
              儲存
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function EditableRow({ label, value, onChange, editing }: { label: string; value: string; editing: boolean; onChange: (v:string)=>void }) {
  return (
    <div className="grid grid-cols-12 gap-4 items-center border-b border-[var(--charcoal)] pb-3">
      <label className="text-gray-400 col-span-3">{label}</label>
      {editing ? (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="col-span-9 bg-[var(--charcoal-light)] border-[var(--charcoal)] text-white"
        />
      ) : (
        <span className="col-span-9 text-white">{value}</span>
      )}
    </div>
  );
} 