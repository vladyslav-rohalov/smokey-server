import { Product } from 'src/products/entities/product.entity';

export async function sortProductsByPrice(
  products: Product[],
  sort: string,
): Promise<Product[]> {
  if (sort === 'cheap') {
    return products.sort((a, b) => +a.price - +b.price);
  } else if (sort === 'expensive') {
    return products.sort((a, b) => +b.price - +a.price);
  } else {
    return products;
  }
}

export async function Pagination(
  products: Product[],
  page: number,
  limit: number,
): Promise<Product[]> {
  if (!page || isNaN(page) || page <= 0) {
    page = 1;
  }
  if (!limit || isNaN(limit) || limit <= 0) {
    limit = 25;
  }
  const start = (page - 1) * limit;
  const end = start + limit;

  return products.slice(start, end);
}

export async function paramToArr(param: string): Promise<string[]> {
  if (param) {
    return param.split(',');
  }
}
// need to add additional sort by available
export async function sortProducts(products: Product[], sort: string) {
  switch (sort) {
    case 'cheap':
      products.sort((a, b) => +a.price - +b.price);
      break;
    case 'expensive':
      products.sort((a, b) => +b.price - +a.price);
      break;
    case 'older':
      products.sort((a, b) => +a.createdAt - +b.createdAt);
      break;
    case 'newer':
      products.sort((a, b) => +b.createdAt - +a.createdAt);
      break;
    default:
      products;
  }
  return products;
}
