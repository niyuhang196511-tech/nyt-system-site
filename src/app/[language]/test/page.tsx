export default function TestPage() {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold mb-8">Tailwind 主题色测试</h1>

            <div className="space-y-6">
                {/* 文本颜色测试 */}
                <section className="p-6 bg-card border rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">文本颜色</h2>
                    <div className="space-y-2">
                        <p className="text-primary text-xl">
                            ✓ text-primary (应该是蓝色 #3B82F6)
                        </p>
                        <p className="text-secondary text-xl">
                            ✓ text-secondary
                        </p>
                        <p className="text-muted-foreground text-xl">
                            ✓ text-muted-foreground (灰色)
                        </p>
                        <p className="text-accent-foreground text-xl">
                            ✓ text-accent-foreground
                        </p>
                        <p className="text-destructive text-xl">
                            ✓ text-destructive (红色)
                        </p>
                    </div>
                </section>

                {/* 背景颜色测试 */}
                <section className="p-6 bg-card border rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">背景颜色</h2>
                    <div className="flex flex-wrap gap-4">
                        <div className="bg-primary text-primary-foreground px-6 py-3 rounded-md">
                            bg-primary
                        </div>
                        <div className="bg-secondary text-secondary-foreground px-6 py-3 rounded-md">
                            bg-secondary
                        </div>
                        <div className="bg-accent text-accent-foreground px-6 py-3 rounded-md">
                            bg-accent
                        </div>
                        <div className="bg-muted text-muted-foreground px-6 py-3 rounded-md">
                            bg-muted
                        </div>
                        <div className="bg-destructive text-destructive-foreground px-6 py-3 rounded-md">
                            bg-destructive
                        </div>
                    </div>
                </section>

                {/* 按钮测试 */}
                <section className="p-6 bg-card border rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">按钮样式</h2>
                    <div className="flex flex-wrap gap-4">
                        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-md transition-colors">
                            Primary 按钮
                        </button>
                        <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-6 py-2 rounded-md transition-colors">
                            Secondary 按钮
                        </button>
                        <button className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-2 rounded-md transition-colors">
                            Outline 按钮
                        </button>
                    </div>
                </section>

                {/* 边框测试 */}
                <section className="p-6 bg-card border rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">边框颜色</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border-2 border-primary p-4 rounded-md">
                            border-primary
                        </div>
                        <div className="border-2 border-secondary p-4 rounded-md">
                            border-secondary
                        </div>
                        <div className="border-2 border-accent p-4 rounded-md">
                            border-accent
                        </div>
                    </div>
                </section>

                {/* CSS 变量原始值 */}
                <section className="p-6 bg-card border rounded-lg">
                    <h2 className="text-2xl font-semibold mb-4">CSS 变量值</h2>
                    <div className="font-mono text-sm space-y-1">
                        <p>
                            --primary:{' '}
                            <span className="text-primary font-bold">
                                217 100% 55%
                            </span>
                        </p>
                        <p>
                            --background:{' '}
                            <span className="text-muted-foreground">
                                0 0% 100%
                            </span>
                        </p>
                        <p>
                            --foreground:{' '}
                            <span className="text-foreground">0 0% 20%</span>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    )
}
