import dynamic from "next/dynamic";
import axios from "@/lib/getService";
// import WaterChart from "@/components/WaterChart";

type Props = {
  params: {
    userId: string;
  };
};
const WaterChart = dynamic(() => import("@/components/WaterChart"));

export default async function Page({ params }: Props) {
  const { userId } = params;
  const response = await axios.get(`/water-summary/${userId}`);

  const data = response.data;

  return (
    <>
      <p className="text-white text-[42px]">{`${userId}`}</p>
      <WaterChart data={data}/>
    </>
  );
}
