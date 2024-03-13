import { MagnifyingGlass } from "react-loader-spinner";
export const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "600px",
        height: "600px",
        margin:'auto'
      }}
    >
      <MagnifyingGlass
        visible={true}
        height="200"
        width="200"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="#e15b64"
      />
    </div>
  );
};
