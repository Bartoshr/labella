import Template, { TemplateType } from "../common/Template";

const API_PATH = "/api";

const API = {
  templates: {
    list(): Promise<Template[]> {
      return fetch(`${API_PATH}/templates`)
        .then((req) => req.json())
        .then((data) => data._embedded.templates as Template[]);
    },
    create(
      name: string,
      content: string,
      type: TemplateType
    ): Promise<Template> {
      const typeStr: String = TemplateType[type];
      return fetch(`${API_PATH}/templates`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          template: content,
          type: typeStr,
        }),
      }).then((req) => req.json());
    },
    read(id: number): Promise<Template> {
      return fetch(`${API_PATH}/templates/${id}`, {
        method: "GET",
      }).then((req) => req.json());
    },
    update(
      id: number,
      name: string,
      content: string,
      type: TemplateType
    ): Promise<Template> {
      const typeStr: String = TemplateType[type];
      return fetch(`${API_PATH}/templates/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          template: content,
          type: typeStr,
        }),
      }).then((req) => req.json());
    },
    delete(id: number) {
      return fetch(`${API_PATH}/templates/${id}`, {
        method: "DELETE",
      });
    },
    attributes(id: number): Promise<string[]> {
      return fetch(`${API_PATH}/templates/${id}/attributes`)
        .then((res) => res.json())
        .then((data) => data.fields);
    },
    print(id: number, attributes: Record<string, string>) {
      return fetch(`${API_PATH}/templates/${id}/print`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: attributes,
        }),
      });
    },

    previewSrc(id: number) {
      return `${API_PATH}/templates/${id}/preview`;
    },
  },
  labels: {
    previewSrc(id: number, fields: Record<string, string>) {
      let queryString = "";

      for (const key in fields) {
        const val = fields[key];
        queryString += `${encodeURI(key)}=${encodeURI(val)}`;
      }

      return `${API_PATH}/templates/${id}/preview?${queryString}`;
    },
  },
};

export default API;
