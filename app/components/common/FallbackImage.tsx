export default function FallbackImage() {
  return (
    <img
      src={"/images/placeholder.svg"}
      alt={"fallback image"}
      title={"fallback image"}
      width={320}
      height={180}
      className="h-full w-full object-cover"
    />
  );
}
