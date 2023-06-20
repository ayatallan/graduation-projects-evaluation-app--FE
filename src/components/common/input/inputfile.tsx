import { UploadSimple } from 'phosphor-react';
import './inputFile.css';
 
/**
 * @param { React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
 *  label? : string
 * }
 * } props 
 */
const InputFile = (props: any) => {
    const { imagename, label, ...inputProps } = props;

    return (
        <div className="inputFile-group">
            {
                label ? (
                    <label>
                        <span>{label}</span>
                        &nbsp;
                        <input {...inputProps} />
                        <button type="button" className="btn btn-success">
                            <UploadSimple size={20} />   Upload
                        </button>
                    </label>) : null
            }
            <span className="image-name">{imagename}</span>

        </div>
    );
};

export default InputFile;