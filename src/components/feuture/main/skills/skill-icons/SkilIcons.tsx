import Icon from "@/components/const/icons/Icon";
import { IconKeys, IconKeyType, IconMap } from "@/components/const/icons/Icon";
import "./SkillIcons.scss"; 

export default function SkilIcons() {
  return (
    <div className="grid-container">
      {IconKeys.map((iconKey: string) => {
        if (iconKey === "x" || iconKey === "instagram") return null;

        const iconName = IconMap[iconKey as IconKeyType].name;

        return (
          <div key={iconKey} className="icon-item">
            <Icon iconKey={iconKey as IconKeyType} size={50} />
            <p>{iconName}</p>
          </div>
        );
      })}
    </div>
  );
}
