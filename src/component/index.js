class SearchableSelect extends HTMLElement {
    constructor() {
        super()
        this.selectedMode = false
        this.$search = this.querySelector('input') ?? document.createElement('INPUT')
        this.$results = document.createElement('DIV')
        this.$results.classList.add('results')
        this.$results.hidden = true
        this.$select = this.querySelector('select')
        this.$selectedResult = undefined
        this.render()
    }

    render() {
        this.setupSearch()
        this.setDefault()
        this.renderResults()
        this.setEvents()
        this.observeOptions()
    }

    observeOptions() {
        const observer = new MutationObserver(() => {
            this.setDefault()
            this.renderResults()
        })

        observer.observe(this.$select, { childList: true })
    }

    static get observedAttributes() {
        return ["placeholder", "aria-label"];
    }

    attributeChangedCallback(name, _, newValue) {
        this.$search.setAttribute(name, newValue);
    }

    toggleResults() {
        this.$results.toggleAttribute('hidden')
    }

    setupSearch() {
        const $container = document.createElement('searchable-select-container')
        $container.classList.add('container')
        $container.prepend(this.$search, this.$results)
        this.prepend($container)
    }

    updateHover($element) {
        const $prev = this.$results.querySelector('[data-hover]')
        if ($prev) {
            $prev.removeAttribute('data-hover')
        }
        if ($element) $element.setAttribute('data-hover', '')
    }

    updateSelected(value) {
        const $prev = this.$select.querySelector('option[selected]')
        if ($prev)
            $prev.removeAttribute('selected')
        const $new = this.$select.querySelector(`option[value="${value}"]`)
        $new.toggleAttribute('selected')
    }

    handleKeyoard(event) {
        const $hovering = this.$results.querySelector('[data-hover]')

        if (!$hovering) return

        if (event.key === 'ArrowDown') {
            event.preventDefault()
            const $next = $hovering.nextElementSibling
            if (!$next) return
            this.updateHover($next)
            $hovering.scrollIntoView()
            return
        }
        if (event.key === 'ArrowUp') {
            event.preventDefault()
            const $prev = $hovering.previousElementSibling
            if (!$prev) return
            this.updateHover($prev)
            $prev.scrollIntoView()
            return
        }
        if (event.key === 'Enter') {
            event.preventDefault()
            $hovering.click()
            return
        }
    }

    setEvents() {
        this.$search.addEventListener('click', () => {
            this.selectedMode = !this.selectedMode

            if (this.selectedMode) {
                this.$search.select()
            } else {
                this.$search.blur()
                this.updateHover(this.$selectedResult)
            }
            this.$selectedResult?.scrollIntoView()
            this.toggleResults()
        })

        const handleKeyboard = this.handleKeyoard.bind(this)

        this.$search.addEventListener('focus', () => {
            this.$search.addEventListener('keydown', handleKeyboard)
        })

        this.$search.addEventListener('blur', () => {
            this.$search.removeEventListener('keydown', handleKeyboard)
        })


        this.$search.addEventListener('input', () => {
            this.renderResults(this.$search.value)
        })

        this.$results.addEventListener('click', ({ target }) => {
            this.selectedMode = false
            this.$select.value = target.dataset.value
            this.updateSelected(target.dataset.value)
            this.setSearch(target.textContent)
            this.toggleResults()
            this.renderResults()
        })
    }

    getOptions() {
        return Array.from(this.querySelectorAll('option'))
    }

    renderResults(search = '') {
        const $new_results = this.getResults(search)

        this.$results.replaceChildren(...$new_results)

        const $to_hover = this.$results.querySelector('[data-selected]') ?? $new_results[0]
        this.updateHover($to_hover)

    }

    setSearch(value) {
        this.$search.value = value.trim()
    }

    setDefault() {
        const $default = this.querySelector('option[selected]')
        if ($default) {
            this.setSearch($default.textContent)
        } else {
            const $blank = document.createElement('option')
            $blank.setAttribute('selected', '')
            this.$select.prepend($blank)
        }
    }

    getResults(to_search = undefined) {
        const
            options = this.getOptions(),
            results = []

        for (const o of options) {
            const content = o.textContent.trim()
            const status = o.hasAttribute('selected')

            if (!content) continue

            const $result = this.createResult({
                value: o.value, status, content
            })

            if (to_search) {
                if (content.toLocaleLowerCase().trim().includes(to_search.toLocaleLowerCase().trim())) {
                    results.push($result)
                }
            } else {
                results.push($result)
            }

        }

        return results
    }


    createResult({ value, status, content }) {
        const $result = document.createElement('DIV')
        $result.className = 'result'
        $result.dataset.value = value
        if (status) {
            $result.setAttribute('data-selected', '')
            this.$selectedResult = $result
        }
        $result.textContent = content
        return $result
    }

}

window.customElements.define('searchable-select', SearchableSelect)