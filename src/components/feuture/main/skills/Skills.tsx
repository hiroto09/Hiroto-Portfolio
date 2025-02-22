import "./skills.scss";
import SkillIcons from "@/components/feuture/main/skills/skill-icons/SkilIcons";

export default function skills() {
  return (
    <>
      <div className="content-title">
        <h1>Skills</h1>
        <div className="content">
          <SkillIcons />
        </div>
      </div>
    </>
  );
}
