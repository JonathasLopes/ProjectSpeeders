import './styles.css';

interface ButtonComponentProps {
    label: string,
    action: () => void
}

function ButtonComponent(props: ButtonComponentProps) {
    const { label, action } = props;
    return(
        <button onClick={action} className='btn-container'>
            {label}
        </button>
    )
}

export default ButtonComponent;