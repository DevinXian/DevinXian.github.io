1. `git rebase -i HEAD~n` squash 的节点前面必须有前置 commit 被 pick，如果不小心选错了范围，可以在 vim 中输入 `:cq` 使其错误退出（不保存文件）并中断交互式 `git rebase`

