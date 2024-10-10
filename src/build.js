import esbuild from 'esbuild'

try {
    await esbuild.build({
        entryPoints: ['src/component/index.js'],
        bundle: true,
        minify: true,
        outfile: 'dist/index.min.js',
    })

    await esbuild.build({
        entryPoints: ['src/component/style.css'],
        minify: true,
        outfile: 'dist/style.min.css',
    })
} catch {
    process.exit(1)
}