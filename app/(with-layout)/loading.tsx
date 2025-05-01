import { Loader } from "lucide-react";
import { Overlay } from "../components/Overlay";

export default function Loading() {
  return (
    <Overlay>
      <p>💨 책장을 불러오고 있어요...</p> <Loader />
    </Overlay>
  );
}
