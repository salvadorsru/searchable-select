class SearchableSelect extends HTMLElement {
    $search = document.createElement('searchable-select-container')
    $input = this.querySelector('input') ?? document.createElement('INPUT')
    $select = this.querySelector('select')
    $results = document.createElement('DIV')
    options = []

    constructor() {
        super()
        this.observeOptions()
        this.render()
        this.renderResults()
    }

    static get observedAttributes() {
        return ["placeholder", "aria-label"];
    }

    attributeChangedCallback(name, _, newValue) {
        this.$input.setAttribute(name, newValue);
    }

    observeOptions() {
        const observer = new MutationObserver(() => {
            this.setDefault()
            this.renderResults()
        })

        observer.observe(this.$select, { childList: true })
    }

    render() {
        this.setDefault()
        this.buildSearch()
        this.bootEvents()
    }

    buildSearch() {
        this.$search.appendChild(this.$input)
        this.$results.classList.add('results')
        this.$results.setAttribute('hidden', '')
        this.$search.appendChild(this.$results)
        this.prepend(this.$search)
    }

    select($to_select) {
        const $prev = this.$results.querySelector('[data-selected]')
        $prev?.removeAttribute('data-selected')
        $prev?.removeAttribute('data-hover')
        $to_select.setAttribute('data-selected', '')
        $to_select.setAttribute('data-hover', '')
        this.$input.value = $to_select.textContent
        const $prev_selected_option = this.querySelector(`option[selected]`)
        $prev_selected_option?.removeAttribute('selected')
        const $option = this.querySelector(`option[value='${$to_select.dataset.value}']`)
        $option.setAttribute('selected', '')
        this.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))
    }


    bootEvents() {
        this.$search.addEventListener('click', () => {
            this.$results.toggleAttribute('hidden')
            this.$results.querySelector('[data-selected]')?.scrollIntoView()
        })

        this.$results.addEventListener('click', (event) => {
            this.select(event.target)
        })

        const handleKeyboard = this.handleKeyoard.bind(this)

        this.$input.addEventListener('input', ({ target: { value } }) => {
            this.renderResults(value)
        })

        this.$input.addEventListener('focus', () => {
            this.$input.addEventListener('keydown', handleKeyboard)
        })

        this.$input.addEventListener('blur', () => {
            this.$input.removeEventListener('keydown', handleKeyboard)
        })
    }

    renderResults(search = '') {
        const $options = Array.from(this.querySelectorAll('option'))
        const $result_list = []
        let set_default_selected;

        for (const $o of $options) {
            if (search !== '') {
                const is_ok = $o.textContent.toLowerCase().includes(search.trim().toLowerCase());
                if (!is_ok) continue
            }

            if ($o.value === '') {
                if ($o.selected) {
                    set_default_selected = true
                }
                continue;
            }

            const $div = document.createElement('DIV')
            $div.textContent = $o.textContent
            $div.dataset.value = $o.value
            $div.classList.add('result')

            if ($o.selected) {
                $div.setAttribute('data-selected', '')
                $div.setAttribute('data-hover', '')
            }

            $result_list.push($div)
        }

        if (set_default_selected) {
            $result_list[0]?.setAttribute('data-hover', '');
        }

        this.$results.replaceChildren(...$result_list)
    }

    setDefault() {
        const $default = this.querySelector('option[selected]')
        if ($default) {
            this.$input.value = $default.textContent
        } else {
            const $blank = document.createElement('option')
            $blank.setAttribute('selected', '')
            this.$select.prepend($blank)
        }
    }

    updateHover($element) {
        const $prev = this.$results.querySelector('[data-hover]')
        $prev?.removeAttribute('data-hover')
        $element?.setAttribute('data-hover', '')
    }

    handleKeyoard(event) {

        const $current_hover = this.$results.querySelector('[data-hover]')

        if (!$current_hover) return

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault()
                const $next = $current_hover.nextElementSibling
                if (!$next) return
                this.updateHover($next)
                $current_hover.scrollIntoView()
                break;
            case 'ArrowUp':
                event.preventDefault()
                const $prev = $current_hover.previousElementSibling
                if (!$prev) return
                this.updateHover($prev)
                $prev.scrollIntoView()
                break;
            case 'Enter':
                event.preventDefault()
                $current_hover.click()
                break;
        }
    }
}

window.customElements.define('searchable-select', SearchableSelect)