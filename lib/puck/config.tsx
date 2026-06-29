import type { Config } from "@measured/puck";
import CustomImageField from "@/components/puck/CustomImageField";
import {
  HeadingBlock,
  TextBlock,
  HeroBlock,
  ImageBlock,
  ColumnsBlock,
  StatsBlock,
  GalleryBlock,
  CtaBlock,
  ButtonBlock,
  SpacerBlock,
} from "@/components/puck/blocks";

/* eslint-disable @typescript-eslint/no-explicit-any */
const imageField = {
  type: "custom" as const,
  label: "Imagen",
  render: ({ value, onChange }: any) => <CustomImageField value={value} onChange={onChange} />,
};

const alignField = {
  type: "select" as const,
  label: "Alineación",
  options: [
    { label: "Izquierda", value: "left" },
    { label: "Centro", value: "center" },
    { label: "Derecha", value: "right" },
  ],
};

export const config: Config = {
  categories: {
    portada: { title: "Portada", components: ["Hero"] },
    contenido: { title: "Contenido", components: ["Heading", "Text", "Columns", "Stats"] },
    medios: { title: "Medios", components: ["Image", "Gallery"] },
    acciones: { title: "Acciones", components: ["Cta", "Button"] },
    diseno: { title: "Diseño", components: ["Spacer"] },
  },
  components: {
    Hero: {
      label: "Portada (hero)",
      fields: {
        eyebrow: { type: "text", label: "Antetítulo" },
        title: { type: "text", label: "Título" },
        subtitle: { type: "textarea", label: "Subtítulo" },
        image: imageField,
        buttonText: { type: "text", label: "Texto del botón" },
        buttonUrl: { type: "text", label: "Link del botón" },
        height: {
          type: "select",
          label: "Alto",
          options: [
            { label: "Chico", value: "sm" },
            { label: "Mediano", value: "lg" },
            { label: "Pantalla completa", value: "full" },
          ],
        },
      },
      defaultProps: { eyebrow: "Antetítulo", title: "Un título grande", subtitle: "Subtítulo de la portada.", height: "lg" } as any,
      render: (props: any) => <HeroBlock {...props} />,
    },
    Heading: {
      label: "Título",
      fields: {
        text: { type: "text", label: "Texto" },
        level: {
          type: "select",
          label: "Tamaño",
          options: [
            { label: "Grande (H1)", value: "h1" },
            { label: "Mediano (H2)", value: "h2" },
            { label: "Chico (H3)", value: "h3" },
          ],
        },
        align: alignField,
      },
      defaultProps: { text: "Un título", level: "h2", align: "left" } as any,
      render: (props: any) => <HeadingBlock {...props} />,
    },
    Text: {
      label: "Texto",
      fields: {
        text: { type: "textarea", label: "Texto" },
        size: {
          type: "select",
          label: "Tamaño",
          options: [
            { label: "Chico", value: "sm" },
            { label: "Normal", value: "md" },
            { label: "Grande", value: "lg" },
          ],
        },
        align: alignField,
      },
      defaultProps: { text: "Escribí tu texto acá…", size: "md", align: "left" } as any,
      render: (props: any) => <TextBlock {...props} />,
    },
    Columns: {
      label: "Texto + Imagen",
      fields: {
        title: { type: "text", label: "Título" },
        text: { type: "textarea", label: "Texto" },
        image: imageField,
        imageSide: {
          type: "select",
          label: "Lado de la imagen",
          options: [
            { label: "Derecha", value: "right" },
            { label: "Izquierda", value: "left" },
          ],
        },
      },
      defaultProps: { title: "Un título", text: "Texto descriptivo.", imageSide: "right" } as any,
      render: (props: any) => <ColumnsBlock {...props} />,
    },
    Stats: {
      label: "Estadísticas",
      fields: {
        items: {
          type: "array",
          label: "Datos",
          arrayFields: {
            value: { type: "text", label: "Número" },
            label: { type: "text", label: "Etiqueta" },
          },
          defaultItemProps: { value: "100%", label: "Dato" },
          getItemSummary: (item: any) => item.label || "Dato",
        },
      },
      defaultProps: {
        items: [
          { value: "400Mt", label: "Producción global" },
          { value: "9%", label: "Reciclaje real" },
          { value: "11Mt", label: "A los océanos" },
          { value: "500", label: "Años en degradarse" },
        ],
      } as any,
      render: (props: any) => <StatsBlock {...props} />,
    },
    Image: {
      label: "Imagen",
      fields: {
        image: imageField,
        caption: { type: "text", label: "Epígrafe" },
        rounded: {
          type: "radio",
          label: "Bordes redondeados",
          options: [
            { label: "Sí", value: true },
            { label: "No", value: false },
          ],
        },
      },
      defaultProps: { rounded: true } as any,
      render: (props: any) => <ImageBlock {...props} />,
    },
    Gallery: {
      label: "Galería",
      fields: {
        images: {
          type: "array",
          label: "Imágenes",
          arrayFields: { image: imageField },
          defaultItemProps: { image: "" },
        },
      },
      defaultProps: { images: [{ image: "" }, { image: "" }, { image: "" }] } as any,
      render: (props: any) => <GalleryBlock {...props} />,
    },
    Cta: {
      label: "Llamado a la acción",
      fields: {
        title: { type: "text", label: "Título" },
        text: { type: "textarea", label: "Texto" },
        buttonText: { type: "text", label: "Texto del botón" },
        buttonUrl: { type: "text", label: "Link del botón" },
      },
      defaultProps: { title: "¿Trabajamos juntos?", text: "Contanos sobre tu proyecto.", buttonText: "Contacto", buttonUrl: "/contacto" } as any,
      render: (props: any) => <CtaBlock {...props} />,
    },
    Button: {
      label: "Botón",
      fields: {
        text: { type: "text", label: "Texto" },
        url: { type: "text", label: "Link" },
        variant: {
          type: "select",
          label: "Estilo",
          options: [
            { label: "Relleno", value: "solid" },
            { label: "Contorno", value: "outline" },
          ],
        },
        align: alignField,
      },
      defaultProps: { text: "Saber más", url: "#", variant: "solid", align: "left" } as any,
      render: (props: any) => <ButtonBlock {...props} />,
    },
    Spacer: {
      label: "Espacio",
      fields: {
        size: {
          type: "select",
          label: "Tamaño",
          options: [
            { label: "Chico", value: "sm" },
            { label: "Mediano", value: "md" },
            { label: "Grande", value: "lg" },
            { label: "Extra grande", value: "xl" },
          ],
        },
      },
      defaultProps: { size: "md" } as any,
      render: (props: any) => <SpacerBlock {...props} />,
    },
  },
};
