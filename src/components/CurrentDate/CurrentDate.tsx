export default function CurrentDate() {
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];

    const currentDate = new Date();
    const dayOfWeek = daysOfWeek[currentDate.getDay()];
    const month = currentDate.toLocaleString("en-US", { month: "long" });
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    const formattedDate = `${month} ${day} / ${year}`;

    return (
        <div>  
            <h3>{dayOfWeek} / {formattedDate}</h3>
        </div>
    );
}