import { Circles } from "react-loader-spinner";

interface LoaderComponentProps {
    show: boolean
}

function LoaderComponent(props: LoaderComponentProps) {
    const {show} = props;

    return (
        <Circles
            height="80"
            width="80"
            color="#0000A4"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={show}
        />
    )
}

export default LoaderComponent;