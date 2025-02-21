import "./awards.scss";
import AwardCard from "./award-card/AwardCard";

export default function Awards() {

    return (
        <div className="awards">
            <h1>Awards</h1>
            <div className="content">
                <AwardCard />
            </div>
        </div>
    )
}