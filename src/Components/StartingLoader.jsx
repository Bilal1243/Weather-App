import { InfinitySpin } from "react-loader-spinner";
export const StartingLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "600px",
        height: "600px",
        margin: "auto",
      }}
    >
      <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};
