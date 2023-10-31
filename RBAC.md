## RBAC 简介

### RBAC(role-based access control)

1. 是一种根据 role 来授权和限制用户访问系统的方法。
2. 原则：最小权限原则，责任分离原则和数据抽象原则；最小范围内分配只读、读写权限，以便用户执行命令和操作数据。
3. 保护数据，提高操作效率，提升安全合规性。
4. 可以支持大规模多角色场景，如：内部员工、第三方合作人员、客户等。

### 核心模型

1. 角色分配：主体(subject)只有被分配了一定角色才能(有对应权限)执行操作。
2. 角色授权：角色必须被授予一定的权限。
3. 权限授权：主体只能执行自身角色已授权的权限。

### 优点
1. 权限管理流程简单，可管理性高
2. 权限分配相对灵活
3. 可以动态调整权限和用户角色

### 缺点
1. 没有提供操作顺序控制机制，对次序有严格要求则不适应
2. 无法做到细粒度授权，无法授权的具体某个资源（可能需要创建很多稀碎的角色，角色爆炸）


### RABC vs. ABAC vs. ACL vs. PBAC

1. ABAC (Attribute-based access control) 基于属性控制，更加精细，扩展容易，但实现更加复杂
2. ACL (Access control list) 更适合底层数据（路由器、交换器等），权限是围绕数据设定，规定资源可以被哪些主体访问
3. PBAC (Policy based access control) 更加复杂，暂时不涉及，见参考文档5


### 参考文档

1. https://www.strongdm.com/rbac
2. https://www.strongdm.com/blog/rbac-vs-abac
3. https://www.authing.cn/blog/532
4. https://www.authing.cn/blog/530
5. https://zhuanlan.zhihu.com/p/450692537?utm_id=0
