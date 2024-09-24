
const ParagraphTag = (props) => {
    const {label} = props;
    return <p className="font-roboto text-lg font-medium leading-6 tracking-wide text-left px-4  text-[#5A87B2]">
    {label}
 </p>
}

export default ParagraphTag;