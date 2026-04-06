const videos = [
  { title: 'JAP Academy haqida', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  { title: 'O\'quvchilarimiz fikrlari', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
];

export default function UsefulPage() {
  return (
    <div className="px-4 py-16 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex text-orange-600 text-[11px] font-bold tracking-widest px-4 py-1.5 rounded-full mb-4" style={{ background:'rgba(255,237,213,0.6)',border:'1px solid rgba(234,88,12,0.1)' }}>FOYDALI</div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">Foydali <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">videolar</span></h1>
        <p className="text-sm text-stone-500 mt-3">O&apos;quv markazimiz haqida batafsil</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {videos.map((v, i) => (
          <div key={i} className="rounded-2xl overflow-hidden" style={{background:'rgba(255,255,255,0.55)',backdropFilter:'blur(16px)',border:'1px solid rgba(255,255,255,0.6)',boxShadow:'0 4px 20px rgba(0,0,0,0.04)'}}>
            <div className="aspect-video">
              <iframe src={v.url} width="100%" height="100%" style={{ border:0 }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </div>
            <div className="p-4">
              <div className="text-sm font-extrabold text-stone-800">{v.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
