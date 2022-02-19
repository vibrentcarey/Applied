// Convert text to job logo
import { SiIndeed, SiLinkedin, SiGlassdoor } from "react-icons/si";

export const textToLogo = (text: string) => {
  if (text === "indeed") {
    return (
      <td className="text-primary">
        <SiIndeed />
      </td>
    );
  } else if (text === "linkedin") {
    return (
      <td className="text-primary">
        <SiLinkedin />
      </td>
    );
  } else if (text === "glassdoor") {
    return (
      <td className="text-primary">
        <SiGlassdoor />
      </td>
    );
  } else {
    return <td className="capitalize">{text}</td>;
  }
};