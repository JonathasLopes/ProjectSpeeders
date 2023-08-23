import { Fragment, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import './styles.css';

interface InputComponentProps {
    label: string,
    placeholder: string,
    isPassword?: boolean,
    onChange: (value: string) => void
}

function InputComponent(props: InputComponentProps) {
    const { label, placeholder, isPassword, onChange } = props;
    const [see, setSee] = useState<boolean>(false);

    const toggleSee = () => {
        setSee(!see);
    }

    return (
        <div className='input-container'>
            <label>{label}</label>
            <div className='input-with-eye'>
                <input
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    type={(isPassword && !see) ? 'password' : 'text'}
                />
                {isPassword &&
                    <Fragment>
                        {see ?
                            <button onClick={toggleSee} className='btn-eye'>
                                <FaEyeSlash size={15} />
                            </button>
                            :
                            <button onClick={toggleSee} className='btn-eye'>
                                <FaEye size={15} />
                            </button>
                        }
                    </Fragment>
                }
            </div>
        </div>
    );
}

export default InputComponent;