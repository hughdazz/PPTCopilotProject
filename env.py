import os
import re

# MODE 为 命令行传递的参数
MODE = os.sys.argv[1]
print("MODE:", MODE)

# 搜索当前文件夹里的所有.vue、.ts和.js文件
# 除了"node_modules"文件夹里的文件

for root, dirs, files in os.walk("."):
    if "node_modules" in dirs:
        dirs.remove("node_modules")
    for file in files:
        if file.endswith(".vue") or file.endswith(".ts") or file.endswith(".js"):
            with open(os.path.join(root, file), "r+", encoding="utf-8") as f:
                print("正在处理文件:", os.path.join(root, file))
                if MODE == "dev":
                    # 将"123.249.70.216"替换为"localhost"
                    content = re.sub(r"123\.249\.70\.216", "localhost", f.read())
                elif MODE == "prod":
                    # 将"localhost"替换为"123.249.70.216"
                    content = re.sub(r"localhost", "123.249.70.216", f.read())
                f.seek(0)
                f.write(content)
                f.truncate()

# Path: env.py
