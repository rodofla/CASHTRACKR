import Image from "next/image"

export default function Logo() {
  return (
    <Image 
        src="/logo.svg" 
        alt="Logo CashTrackr" 
        width={400} 
        height={100}
        className="w-full" 
        priority 
    />
  )
}
