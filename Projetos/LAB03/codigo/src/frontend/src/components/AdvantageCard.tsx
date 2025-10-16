export type Advantage = {
  id: string
  title: string
  price: number
  image?: string
}

export default function AdvantageCard({ item, onDetails }: { item: Advantage; onDetails?: (id: string) => void }) {
  return (
    <div className="card overflow-hidden">
      <div className="h-36 bg-slate-100">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-400">Imagem</div>
        )}
      </div>
      <div className="p-3">
        <div className="font-medium mb-1 truncate">{item.title}</div>
        <div className="text-sm text-slate-600 mb-3">{item.price} moedas</div>
        <button className="btn w-full" onClick={() => onDetails?.(item.id)}>Ver detalhes</button>
      </div>
    </div>
  )
}
