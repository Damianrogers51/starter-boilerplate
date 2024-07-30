export default function Icon(props: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-center relative size-8">
      {props.children}
      <div className="size-full shadow-[inset_0_0_0_5px_rgb(10,10,10)] rounded-xl" />
    </div>
  )
}