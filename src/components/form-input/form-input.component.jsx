import './form-input.styles.scss';
const FormInput = ({ label, ...inputProps }) => {
	return (
		<div className="group">
			<input {...inputProps} className="form-input" />
			{label && (
				<label
					className={`${
						inputProps.value.length ? 'shrink' : ''
					} form-input-label`}
				>
					{label}
				</label>
			)}
		</div>
	);
};

export default FormInput;
