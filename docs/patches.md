# Patches

Documentation for clusterIDE patches applied on top of VS Code.

---

## fix-policies

**Replace `@vscode/policy-watcher` with `@clusterIDE/policy-watcher`**

VS Code uses `@vscode/policy-watcher` to enforce Group Policy Objects (GPOs) on
Windows. That package reads from:

```
HKLM\SOFTWARE\Policies\Microsoft\<productName>
```

clusterIDE forks this into `@clusterIDE/policy-watcher`, which takes a separate
`vendorName` argument. The `createWatcher()` call becomes:

```ts
createWatcher('clusterIDE', this.productName, ...)
```

Because clusterIDE sets `product.nameLong = 'clusterIDE'` (via `prepare_vscode.sh`),
`this.productName` resolves to `'clusterIDE'` at runtime. Therefore, the final
Windows registry key that clusterIDE reads policies from is:

```
HKLM\SOFTWARE\Policies\clusterIDE\clusterIDE\<PolicyName>
```

(or `HKCU\SOFTWARE\Policies\clusterIDE\clusterIDE\<PolicyName>` for per-user policies)

This differs from VS Code's path (`Microsoft\VSCode`) and is the root cause of
[issue #2714](https://github.com/cl-andro/cluster-IDE/issues/2714) where users mirror
VS Code's registry structure and find their GPOs ignored. Enterprise admins must
use the clusterIDE-specific registry path.

### References

- [clusterIDE issue #2714](https://github.com/cl-andro/cluster-IDE/issues/2714)
- [clusterIDE/policy-watcher — RegistryPolicy.hh](https://github.com/cl-andro/cluster-IDE/policy-watcher/blob/main/src/windows/RegistryPolicy.hh)
