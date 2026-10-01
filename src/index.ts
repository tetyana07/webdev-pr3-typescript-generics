import { GadgetRepository } from "./repositories";
import { ApiResponse, EntityStatus, GadgetEntity } from "./types";

console.log("=== ІНІЦІАЛІЗАЦІЯ GENERIC SERVICE LAYER ===\n");

const repo = new GadgetRepository();

const phone = repo.createFromDto({
  title: "Смартфон Nova X",
  price: 14999,
  warrantyMonths: 24,
  specs: ["Snapdragon 8 Gen 2", 8],
  status: EntityStatus.Active,
});
console.log(`- Створено сутність ID: ${phone.id} | Статус: ${phone.status} | Назва: ${phone.title}\n`);

repo.createFromDto({
  title: "Ноутбук ProBook 15",
  price: 32999,
  warrantyMonths: 12,
  specs: ["Intel Core i7", 16],
  status: EntityStatus.Active,
});
repo.createFromDto({
  title: "Планшет Tab S",
  price: 9999,
  warrantyMonths: 12,
  specs: ["Exynos 1380", 4],
  status: EntityStatus.Archived,
});

const updated = repo.update(phone.id, { price: 13499 });
console.log(`- Оновлено сутність ID: ${updated?.id} | Актуалізовано ціну та updatedAt.\n`);

const all = repo.findAll();
console.log(`Отримано сутностей у репозиторії: ${all.length}\n`);

console.log("=== СТАТИСТИКА СТАТУСІВ (RECORD) ===");
console.log(JSON.stringify(repo.getStatusAnalytics(), null, 2));

console.log("\n=== СТАНДАРТИЗОВАНА ВІДПОВІДЬ API (GENERIC API RESPONSE) ===");
const response: ApiResponse<GadgetEntity | null> = {
  success: updated !== null,
  data: updated,
  timestamp: new Date(),
  meta: { totalCount: all.length, version: "1.0.0" },
};
console.log(JSON.stringify(response, null, 2));