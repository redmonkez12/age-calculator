import { Poppins } from "next/font/google";
import { Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import Image from "next/image";

import { DateWrapper } from "@/components/Date";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

type FormValues = {
    day: string;
    month: string;
    year: string;
};

export default function Home() {
    function validateDay(value: string) {
        if (!value) {
            return "Must be a valid day";
        }
        const day = parseInt(value, 10);
        if (isNaN(day) || day < 1 || day > 31) {
            return "Must be a valid day";
        }
        return null;
    }

    function validateMonth(value: string) {
        if (!value) {
            return "Must be a valid month";
        }
        const month = parseInt(value, 10);
        if (isNaN(month) || month < 1 || month > 12) {
            return "Must be a valid month";
        }
        return null;
    }

    function validateYear(value: string) {
        if (!value) {
            return "Must be a valid year";
        }
        const year = parseInt(value, 10);
        if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
            return "Must be a valid year";
        }
        return null;
    }

    const form = useForm<FormValues>({
        initialValues: {
            day: "",
            month: "",
            year: "",
        },
        validate: {
            day: (value) => validateDay(value),
            month: (value) => validateMonth(value),
            year: (value) => validateYear(value),
        },
    });

    function handleDayChange(value: string) {
        form.setFieldValue("day", value);
        form.setFieldError("day", validateDay(value));
    }

    function handleMonthChange(value: string) {
        form.setFieldValue("month", value);
        form.setFieldError("month", validateMonth(value));
    }

    function handleYearChange(value: string) {
        form.setFieldValue("year", value);
        form.setFieldError("year", validateYear(value));
    }


    const formValues = form.values;
    const formErrors = form.errors;
    const isValid = form.isValid();
    const isTouched = form.isTouched();

    function calculateAge() {
        const { year, day, month } = formValues;

        const today = new Date();
        const birthDate = new Date(Number(year), Number(month) - 1, Number(day));
        let age = today.getFullYear() - birthDate.getFullYear();
        let monthDiff = today.getMonth() - birthDate.getMonth();
        let dayDiff = today.getDate() - birthDate.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
            monthDiff += 12;
        }

        if (dayDiff < 0) {
            const monthDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
            dayDiff += monthDays;
            monthDiff--;
        }

        return {
            years: age,
            months: monthDiff,
            days: dayDiff,
        };
    }

    const { years, days, months } = (isValid && isTouched && Object.values(formValues).every(Boolean)) ? calculateAge() : { days: 0, years: 0, months: 0 };

    return (
        <main className={`${poppins.className} bg-white md:p-14 px-6 py-12`}>
            <Group className={"gap-4"}>
                <TextInput
                    label={"Day"}
                    placeholder="DD"
                    {...form.getInputProps("day")}
                    value={formValues.day || ""}
                    onChange={(e) => handleDayChange(e.target.value)}
                    labelProps={{ className: formErrors.day ? "red" : undefined }}
                />

                <TextInput
                    label={"Month"}
                    placeholder="HH"
                    {...form.getInputProps("month")}
                    value={formValues.month || ""}
                    onChange={(e) => handleMonthChange(e.target.value)}
                    labelProps={{ className: formErrors.month ? "red" : undefined }}
                />

                <TextInput
                    label={"Year"}
                    placeholder="YYYY"
                    {...form.getInputProps("year")}
                    value={formValues.year || ""}
                    onChange={(e) => handleYearChange(e.target.value)}
                    labelProps={{ className: formErrors.year ? "red" : undefined }}
                />
            </Group>

            <div className="divider">
                <div className="circle">
                    <Image src={"/images/icon-arrow.svg"} width={44} height={44} alt={"image"}/>
                </div>
            </div>

            <Stack>
                <DateWrapper value={isValid ? years : 0} title={"years"}/>
                <DateWrapper value={isValid ? months : 0} title={"months"}/>
                <DateWrapper value={isValid ? days : 0} title={"days"}/>
            </Stack>
        </main>
    );
}
