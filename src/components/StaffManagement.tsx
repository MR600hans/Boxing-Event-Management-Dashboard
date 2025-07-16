import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useNavigate } from 'react-router-dom';

interface Person {
  id: number;
  name: string;
  gender: '男' | '女';
  age: number;
}

const fighters: Person[] = [
  { id: 1, name: '林育廷', gender: '男', age: 27 },
  { id: 2, name: '周建宏', gender: '男', age: 29 },
  { id: 3, name: '王心凌', gender: '女', age: 25 },
  { id: 4, name: '陳信安', gender: '男', age: 26 },
  { id: 5, name: '李國強', gender: '男', age: 28 },
  { id: 6, name: '張家豪', gender: '男', age: 24 },
  { id: 7, name: '周思齊', gender: '男', age: 30 },
  { id: 8, name: '林書豪', gender: '男', age: 31 },
  { id: 9, name: '蔡依林', gender: '女', age: 23 },
  { id: 10, name: '江宏傑', gender: '男', age: 27 },
  { id: 11, name: '郭泓志', gender: '男', age: 32 },
  { id: 12, name: '蕭敬騰', gender: '男', age: 29 },
  { id: 13, name: '吳岱豪', gender: '男', age: 28 },
  { id: 14, name: '張泰山', gender: '男', age: 27 },
  { id: 15, name: '林昀儒', gender: '男', age: 22 },
];

const judges: Person[] = [
  { id: 101, name: '張大志', gender: '男', age: 45 },
  { id: 102, name: '李明', gender: '男', age: 40 },
  { id: 103, name: '王偉', gender: '男', age: 38 },
  { id: 104, name: '周偉倫', gender: '男', age: 39 },
  { id: 105, name: '林子豪', gender: '男', age: 41 },
  { id: 106, name: '陳怡君', gender: '女', age: 37 },
  { id: 107, name: '楊宗樺', gender: '男', age: 36 },
  { id: 108, name: '王馨平', gender: '女', age: 42 },
  { id: 109, name: '蔡明宏', gender: '男', age: 44 },
  { id: 110, name: '郭建志', gender: '男', age: 43 },
  { id: 111, name: '陳怡廷', gender: '女', age: 35 },
  { id: 112, name: '黃瑞麟', gender: '男', age: 34 },
  { id: 113, name: '呂孟德', gender: '男', age: 38 },
  { id: 114, name: '許文龍', gender: '男', age: 39 },
  { id: 115, name: '賴雅妍', gender: '女', age: 37 },
];

const staffs: Person[] = [
  { id: 201, name: '陳富', gender: '男', age: 32 },
  { id: 202, name: '陳靜', gender: '女', age: 30 },
  { id: 203, name: '林書豪', gender: '男', age: 28 },
  { id: 204, name: '王大華', gender: '男', age: 29 },
  { id: 205, name: '李小美', gender: '女', age: 27 },
  { id: 206, name: '郭小強', gender: '男', age: 31 },
  { id: 207, name: '謝文豪', gender: '男', age: 33 },
  { id: 208, name: '曾心怡', gender: '女', age: 26 },
  { id: 209, name: '藍心湄', gender: '女', age: 34 },
  { id: 210, name: '吳宗憲', gender: '男', age: 35 },
  { id: 211, name: '胡瓜', gender: '男', age: 36 },
  { id: 212, name: '曹西平', gender: '男', age: 39 },
  { id: 213, name: '詹雅雯', gender: '女', age: 28 },
  { id: 214, name: '曾國城', gender: '男', age: 40 },
  { id: 215, name: '阿Ken', gender: '男', age: 32 },
];

const admins: Person[] = [
  { id: 301, name: '高橋', gender: '男', age: 35 },
  { id: 302, name: '張雅婷', gender: '女', age: 34 },
  { id: 303, name: '李冠儀', gender: '女', age: 33 },
  { id: 304, name: '陳怡樺', gender: '女', age: 36 },
  { id: 305, name: '葉大雄', gender: '男', age: 38 },
  { id: 306, name: '林志玲', gender: '女', age: 39 },
  { id: 307, name: '蔡依林', gender: '女', age: 38 },
  { id: 308, name: '周杰倫', gender: '男', age: 40 },
  { id: 309, name: '羅志祥', gender: '男', age: 41 },
  { id: 310, name: '陳漢典', gender: '男', age: 34 },
  { id: 311, name: '江宏傑', gender: '男', age: 31 },
  { id: 312, name: '郭書瑤', gender: '女', age: 30 },
  { id: 313, name: '蘇貞昌', gender: '男', age: 43 },
  { id: 314, name: '賴清德', gender: '男', age: 45 },
  { id: 315, name: '韓國瑜', gender: '男', age: 46 },
];

function Table({ data }: { data: Person[] }) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const pageCount = Math.ceil(data.length / pageSize);
  const start = (page - 1) * pageSize;
  const visible = data.slice(start, start + pageSize);
  return (
    <div className="overflow-x-auto bg-[var(--charcoal-light)] rounded-lg border border-[var(--charcoal-lighter)]">
      <table className="min-w-full text-sm text-left text-gray-300">
        <thead className="bg-[var(--charcoal)] text-gray-400 uppercase tracking-wider">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">姓名</th>
            <th className="px-6 py-3">性別</th>
            <th className="px-6 py-3">年齡</th>
            <th className="px-6 py-3 text-center">排班</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((p, idx) => (
            <tr
              key={p.id}
              className={idx % 2 === 0 ? 'bg-[var(--charcoal-light)]' : 'bg-[var(--charcoal)]'}
            >
              <td className="px-6 py-3 whitespace-nowrap text-white">{p.id}</td>
              <td className="px-6 py-3 whitespace-nowrap">{p.name}</td>
              <td className="px-6 py-3 whitespace-nowrap">{p.gender}</td>
              <td className="px-6 py-3 whitespace-nowrap">{p.age}</td>
              <td className="px-6 py-3 text-center">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[var(--boxing-blue)] text-[var(--boxing-blue)] hover:bg-[var(--boxing-red)] hover:border-[var(--boxing-red)] hover:text-white"
                  disabled
                >
                  查看
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* pagination */}
      <div className="flex justify-end items-center gap-2 p-4 text-sm">
        <Button size="sm" variant="outline" className="border-[var(--charcoal-lighter)] text-gray-300 hover:bg-[var(--charcoal)]" disabled={page===1} onClick={()=>setPage(p=> Math.max(1,p-1))}>上一頁</Button>
        <span>第 {page} / {pageCount} 頁</span>
        <Button size="sm" variant="outline" className="border-[var(--charcoal-lighter)] text-gray-300 hover:bg-[var(--charcoal)]" disabled={page===pageCount} onClick={()=>setPage(p=> Math.min(pageCount,p+1))}>下一頁</Button>
      </div>
    </div>
  );
}

export function StaffManagement() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('fighters');

  return (
    <div className="container mx-auto px-6 py-8 text-white">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-400 hover:text-white hover:bg-[var(--charcoal)]"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> 返回
      </Button>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">人員管理</h2>
        <Button
          size="default"
          className="flex items-center gap-1 bg-[var(--boxing-blue)] hover:bg-[var(--boxing-red)] px-5 py-2"
          onClick={() => alert('新增功能尚未實作')}
        >
          <Plus className="w-5 h-5" /> 新增
        </Button>
      </div>

      <Tabs value={tab} onValueChange={(v: string) => setTab(v)} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[var(--charcoal)]">
          <TabsTrigger value="fighters" className="data-[state=active]:bg-[var(--boxing-red)] data-[state=active]:text-white">選手</TabsTrigger>
          <TabsTrigger value="judges" className="data-[state=active]:bg-[var(--boxing-red)] data-[state=active]:text-white">裁判</TabsTrigger>
          <TabsTrigger value="staffs" className="data-[state=active]:bg-[var(--boxing-red)] data-[state=active]:text-white">工作人員</TabsTrigger>
          <TabsTrigger value="admins" className="data-[state=active]:bg-[var(--boxing-red)] data-[state=active]:text-white">管理人員</TabsTrigger>
        </TabsList>

        <TabsContent value="fighters">
          <Table data={fighters} />
        </TabsContent>
        <TabsContent value="judges">
          <Table data={judges} />
        </TabsContent>
        <TabsContent value="staffs">
          <Table data={staffs} />
        </TabsContent>
        <TabsContent value="admins">
          <Table data={admins} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 