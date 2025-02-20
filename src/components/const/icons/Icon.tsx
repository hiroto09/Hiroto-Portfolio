import type { ReactElement } from 'react';
import { 
    SiHtml5,
    SiCss3,
    SiSass,
    SiJavascript,
    SiTypescript,
    SiReact,
    SiVite,
    SiNextdotjs,
    SiSvelte,
    SiAstro,
    SiThreedotjs,
    SiKotlin,
    SiUnity,
    SiC,
    SiCplusplus,
    SiEslint,
    SiPrettier,
    SiPrisma,
    SiSupabase,
    SiCloudflarepages,
    SiCloudflareworkers,
    SiGithub,
    SiX,
    SiInstagram,
    SiHono,
} from "@icons-pack/react-simple-icons"

export  const IconMap= {
    html:{name: "HTML",icon: SiHtml5},
    css:{name: "CSS",icon: SiCss3},
    sass:{name: "Sass",icon: SiSass},
    javascript:{name: "JavaScript",icon: SiJavascript},
    typescript:{name: "TypeScript",icon: SiTypescript},
    react:{name: "React",icon: SiReact},
    vite:{name: "Vite",icon: SiVite},
    next:{name: "Next.js",icon: SiNextdotjs},
    svelte:{name: "Svelte",icon: SiSvelte},
    astro:{name: "Astro",icon: SiAstro},
    threejs:{name: "Three.js",icon: SiThreedotjs},
    hono:{name: "Hono",icon: SiHono},
    kotlin:{name: "Kotlin",icon: SiKotlin},
    unity:{name: "Unity",icon: SiUnity},
    c:{name: "C",icon: SiC},
    cpp:{name: "C++",icon: SiCplusplus},
    eslint:{name: "ESLint",icon: SiEslint},
    prettier:{name: "Prettier",icon: SiPrettier},
    prisma:{name: "Prisma",icon: SiPrisma},
    supabase:{name: "Supabase",icon: SiSupabase},
    cloudflarepages:{name: "CloudflarePages",icon: SiCloudflarepages},
    cloudflareworkers:{name: "CloudflareWorkers",icon: SiCloudflareworkers},
    github:{name: "GitHub",icon: SiGithub},
    x:{name: "X",icon: SiX},
    instagram:{name: "Instagram",icon: SiInstagram},
}

export const IconKeys = Object.keys(IconMap)

export type IconKeyType = keyof typeof IconMap

interface IconProps {
    iconKey: IconKeyType;
    color?: string;
    className?: string;
    size?: number;
}

export default function Icon(props:IconProps):ReactElement {
    const {iconKey,color,...any} = props;
    const SelectIcon = IconMap[iconKey];
    const SelectColor = color ?? "default";

    return (
        <SelectIcon.icon color={SelectColor} {...any}/>
    )
}




