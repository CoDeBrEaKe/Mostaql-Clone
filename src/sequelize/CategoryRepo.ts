import Category from "../models/Category";
import DataRepo, { Constructor } from "./dataRepo";
export function CategoryRepo<T extends Constructor<DataRepo>>(Base: T) {
  return class extends Base {
    getCategories() {
      return Category.findAll();
    }
    getCategory(id: number) {
      return Category.findByPk(id);
    }
    createCategories(categoryAttributes: { category: string }) {
      console.log(categoryAttributes);
      return Category.create(categoryAttributes);
    }
    async getCategoryProducts(id: number) {
      const category = await Category.findByPk(id);
      if (!category) {
        throw new Error("No Category Found");
      }
      return category.$get("projects" as keyof Category, {
        limit: this.defaultLimit,
      });
    }
  };
}
