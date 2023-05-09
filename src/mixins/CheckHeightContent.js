export const checkHeightContent = {
  methods: {
    async checkHeightContent(container, content) {
      if (container.clientHeight > content.clientHeight) {
        await this.getNextList()
        this.loading = false
      }
    },
  },
}

export const _ = null