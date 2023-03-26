# dex swap 脚本

> 此脚本请从根目录 cd 进来后使用

Pancake 测试网合约地址：

router: https://testnet.bscscan.com/address/0xD99D1c33F9fC3444f8101754aBC46c52416550D1
factory: https://testnet.bscscan.com/address/0x6725f303b657a9451d8ba641348b6761a6cc7a17

## 使用

### 安装依赖

```bash
pnpm install
```

### 创建配置文件

```bash
cp .env.example .env
cp .secret.example .secret
```

将其中的以下配置项修改为你的配置

```bash
TOKEN0_ADDRESS=从项目根目录的部署合约中得到
TOKEN1_ADDRESS=从项目根目录的部署合约中得到
PAIR_ADDRESS=从下面的创建币对得到
```

```bash
# 创建币对
node create-pair.js

# 复制上一步得到的 contract address，修改.env 中币对地址 PAIR_ADDRESS

# 查询 token 余额 和 币对余额
node get-balance.js

# 授权
node approve.js

# 添加流动性
node add-liquidity.js

# 买入
node swap-buy.js

# 卖出
node swap-sell.js
```
