#!/bin/bash

read -p "Nama module: " module

base_dir="src/modules/$module"

mkdir -p $base_dir/{components,composables,schemas,services,stores,views}

# Optional: buat file kosong supaya langsung terlihat strukturnya
touch $base_dir/views/${module^}View.vue
touch $base_dir/components/${module^}Form.vue
touch $base_dir/composables/use${module^}Form.ts
touch $base_dir/stores/${module}.ts
touch $base_dir/schemas/${module}Schema.ts
touch $base_dir/services/${module}Service.ts

echo "✅ Module '$module' berhasil dibuat di $base_dir"
