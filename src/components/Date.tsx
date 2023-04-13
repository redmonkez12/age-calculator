type Props = {
    value:  number;
    title: string;
};

export function DateWrapper({ title, value }: Props) {
    return (
        <div className={"flex items-center gap-3 md:gap-6 md:text-[6.5rem] text-[3.5rem]"}>
            {value ? <div className={"font-extrabold text-purple leading-[7.125rem] tracking-[-0.02rem] italic h-[7.125rem]"}>{value}</div> :
                <div className={"flex gap-3 md:gap-8"}>
                    <div className={"rectangle"}></div>
                    <div className={"rectangle"}></div>
                </div>}
            <div
                className={"font-extrabold text-black leading-[7.125rem] tracking-[-0.02rem] italic h-[7.125rem]"}>{title}</div>
        </div>
    );
}